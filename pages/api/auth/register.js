import { users } from "../../../utils/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  return res.status(201).json({ message: "Регистрация успешна" });
}
