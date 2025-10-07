import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import fs from "fs";
import colors from "colors";
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";

const otp = Math.floor(100000 + Math.random() + 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const handlebarsOptions = {
  viewEngine: {
    extname: ".hbs",
    defaultLayout: false,
    partialsDir: path.resolve("./views/"),
  },
  viewPath: path.resolve("./views/"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarsOptions));

export const signup = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const toBeCreatedUser = new User({
      name,
      password: hashPassword,
      email,
      phone,
      profilePicture: req.file.profilePicture,
    });
    await toBeCreatedUser.save();

    // Step 3: Mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Welcome Email with Handlebars",
      template: "email", // corresponds to email.handlebars
      context: {
        otp: otp,
      },
    };

    // Step 4: Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.error("Error:", err);
        res.status(451).send("OTP not sent Please try again");
      }
    });

    const date = new Date();
    const milliseconds = date.getMilliseconds();
    const session = await bcrypt.hash(`${milliseconds}${user._id}`, salt);
    await OTP.create({ otp, sessionId: session });
    res.status(201).send({ session, msg: "Created User" });
  } catch (error) {
    console.log(error);
    fs.unlink(`public/profilePic/${req.file.fileName}`, (err) => {
      if (err) throw err;
      console.log("File deleted!");
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    let { otp, sessionId } = req.body;
    let otpData = await otp.findOne({ sessionId: sessionId });
    let attempts = otpData.attempts;
    if (otp == otpData.otp) {
      await OTP.findByIdAndDelete(otpData._id);
      const token = jwt.sign(
        { email: email, passwod: user.password },
        process.env.SECRET,
        {
          expiresIn: "1hr",
        }
      );
      res.send({token,msg:"Authenticated!"})
    } else {
      attempts -= 1;
    }

    if (attempts == 0) {
      await OTP.findByIdAndDelete(otpData._id);
      res.status(400).send("Resend OTP");
    } else {
      await OTP.findByIdAndUpdate(otpData._id);
      attempts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendOtpController=async (req,res)=>{
  try {
    
  } catch (error) {
    console.log(err);
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign(
          { userId:user._id },
          process.env.SECRET,
          {
            expiresIn: "1hr",
          }
        );
        res.send({ token, msg: "Authenticated!" });
      } else {
        res.status(401).send("Authentication failed");
      }
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    console.log(error.red.bold);
  }
};

export const checkLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const verified = await jwt.verify(token, process.env.SECRET);
    res.send({ msg: "Token Valid" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Signin again" });
  }
};
