import { Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/jwt"

const prisma = new PrismaClient();

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // return clean response (exclude password)
    res.status(201).json({
      msg: "User registered successfully!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error registering user" });
  }
};


// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      JWT_SECRET,                         // secret key
      { expiresIn: "1d" }                 // token expiry
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};

