// pages/account.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseCookies } from "../utils/cookies";
import styles from "../styles/styles.module.css";

export default function Account({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.accountContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.member_first_name?.charAt(0) || "U"}
        </div>
        <h2>Личный кабинет</h2>
        <div className={styles.infoBlock}>
          <div className={styles.infoRow}>
            <span>ФИО:</span>
            <span>{user.member_last_name} {user.member_first_name}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Никнейм:</span>
            <span>{user.member_account}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Телефон:</span>
            <span>{user.member_phone}</span>
          </div>
          <div className={styles.balanceRow}>
            <span>Баланс:</span>
            <span>{user.member_balance} ₽</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.bookBtn}
            onClick={() => router.push("/")}
          >
            Забронировать ПК
          </button>
          <button
            className={styles.logoutBtn}
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/login");
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

// Подгружаем данные через API iCafe
export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const token = process.env.API_TOKEN;

  if (!cookies.user) {
    return { props: { user: null } };
  }

  const { username } = JSON.parse(cookies.user);

  const response = await fetch(
    `https://eu16.icafecloud.com/api/v2/cafe/77289/members?search_text=${encodeURIComponent(
      username
    )}&search_field=member_account&page=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await response.json();
  const user = data?.data?.members?.[0] || null;

  return { props: { user } };
}
