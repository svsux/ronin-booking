import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/styles.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/account");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Вход в личный кабинет</h1>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <label>Логин</label>
        <input
          type="text"
          placeholder="Введите логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Пароль</label>
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
