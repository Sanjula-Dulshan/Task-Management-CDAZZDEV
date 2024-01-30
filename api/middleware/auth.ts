import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler<unknown, unknown, any, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(400).send({ msg: "Invalid Authentication" });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      (err: any, user: any) => {
        if (err) return res.status(400).send({ msg: "Invalid Authentication" });
        req.body.user = user;
        next();
      }
    );
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export default auth;
