import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const { phone, code } = req.body;

  if (!global.smsCodes || global.smsCodes[phone] !== code) {
    return res.status(400).json({ message: "Неверный код" });
  }

  delete global.smsCodes[phone];

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user_phone", phone, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  return res.status(200).json({ message: "Успешно" });
}
