import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../services/authService";

const prisma = new PrismaClient();

export const registerUser = async (c: Context) => {
 
  const body = await c.req.json();
  const { username, password } = body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    return c.json(user, 201); 
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};

export const loginUser = async (c: Context) => {
 
  const body = await c.req.json();
  const { username, password } = body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && (await verifyPassword(password, user.password))) {
     
      return c.json({ message: "Login successful" }, 200); 
    } else {
      return c.json({ error: "Invalid credentials" }, 401); 
    }
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};
