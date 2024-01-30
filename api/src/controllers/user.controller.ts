import { RequestHandler } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { ILoginBody, ITokenPayload, IUser } from "../../interfaces/user";

export const Register: RequestHandler<
  unknown,
  unknown,
  IUser,
  unknown
> = async (req, res) => {
  // validate user input
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().trim(),
    password: Joi.string().min(8).max(30).required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await UserModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser: IUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const user = new UserModel(newUser);

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const Login: RequestHandler<
  unknown,
  unknown,
  ILoginBody,
  unknown
> = async (req, res, next) => {
  // validate user input
  const Schema = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(8).max(30).required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or password is wrong");

  try {
    //refresh token
    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).send({
      userId: user._id,
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

//Logout user
export const logout: RequestHandler<
  unknown,
  unknown,
  ILoginBody,
  unknown
> = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
    return res.send("Logged out.");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

//get access token
export const getAccessToken: RequestHandler = async (req, res) => {
  console.log("re", req.cookies);

  const rf_token = req.cookies.refreshtoken;
  if (!rf_token) return res.status(400).send("Please login now!");

  jwt.verify(
    rf_token,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err: any, user: any) => {
      if (err) return res.status(400).send("Please login now!");

      const access_token = createAccessToken({ id: user.id });
      res.send({ access_token });
    }
  );
};

//Create refresh token
const createRefreshToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "7d",
  });
};

//Create access token
const createAccessToken = (payload: ITokenPayload) => {
  console.log("payload", payload);
  console.log(
    "process.env.ACCESS_TOKEN_SECRET",
    process.env.ACCESS_TOKEN_SECRET
  );
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "15m",
  });
};
