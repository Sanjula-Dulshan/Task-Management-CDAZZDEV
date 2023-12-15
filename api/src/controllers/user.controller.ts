import { RequestHandler } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { ILoginBody, IUser } from "../../interfaces/user";

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

  // create a token and assign it to the header
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || "");
  res.send({ token, userId: user._id });
};
