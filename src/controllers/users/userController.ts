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
  console.log(req.body);

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    // return clean response (exclude password)
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error logging in user" });
  }
};

