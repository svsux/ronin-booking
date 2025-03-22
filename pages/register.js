// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/styles.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Здесь можно заменить на реальную регистрацию с API
    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/");
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Регистрация</h1>
      <form onSubmit={handleRegister} className={styles.authForm}>
        <label>Почта</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
        <p>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </form>
    </div>
  );
}
