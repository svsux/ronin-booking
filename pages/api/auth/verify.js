// pages/api/auth/verify.js
import cookie from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const { code } = req.body;
  const validCode = req.cookies.verification_code;

  if (!validCode || validCode !== code) {
    return res.status(401).json({ message: "Неверный код" });
  }

  // Авторизация успешна
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", req.cookies.pending_user, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  // Очищаем временные куки
  res.setHeader(
    "Set-Cookie",
    [
      cookie.serialize("verification_code", "", { path: "/", maxAge: 0 }),
      cookie.serialize("pending_user", "", { path: "/", maxAge: 0 })
    ]
  );

  return res.status(200).json({ message: "Успешно" });
}
