import cookie from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    })
  );

  return res.status(200).json({ message: "Выход выполнен" });
}
