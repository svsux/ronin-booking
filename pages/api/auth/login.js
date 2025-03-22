import * as cookie from "cookie";
import users from "../../../data/users.json";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", JSON.stringify({ username }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  return res.status(200).json({ message: "Успешно" });
}
