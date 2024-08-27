import { Request, Response } from "hono";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../services/authService";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && (await verifyPassword(password, user.password))) {
      // Generate JWT token (not implemented here)
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
