import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import UserModel from "../Models/User.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import { validationResult } from 'express-validator';

/// register user  ////////

export const registerUser = catchAsyncErrors(async (req, res, next) => {

  try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      //----------- check email already exist or not ----------------------//
      let userdata = await UserModel.findOne({email:req.body.email});
      
      if(userdata){
        return res.status(400).json({error:"This Email is already registered"});
      }
      const { name, email, password } = req.body;

      const user = await UserModel.create({
        name,
        email,
        password,
      });

      sendToken(user, 200, res);

      // const token = user.getJWTToken();

      // res.status(201).json({
      //   success: true,
      //   user,
      //   token,
      // });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
  
});

//// login user /////

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  /// check if the user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("please enter Email & password", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(), "Invalid email & password", 401);
  }
  // console.log(user);
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(), "Invalid email & password", 401);
  }

  sendToken(user, 200, res);

  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

///// logout /////
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

///// forgot password /////
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  // console.log(user);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  /////// get reset password token from user model that we create ///////
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  console.log(resetPasswordUrl);

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
