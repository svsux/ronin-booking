import { useEffect, useState } from "react";
import { fetchPCs, bookPC as apiBookPC } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PcGrid from "../components/PcGrid";
import PremiumZones from "../components/PremiumZones";
import styles from "../styles/styles.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [pcs, setPcs] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Комфорт");
  const router = useRouter();

  const load = async () => {
    const data = await fetchPCs();
    setPcs(data);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = async (pcName) => {
    await apiBookPC(pcName);
    await load();
    toast.success(`ПК ${pcName} забронирован на 1 минуту!`, { position: "top-center" });
  };

  const groups = [...new Set(pcs.map((pc) => pc.pc_group_name))].filter(Boolean);

  return (
    <div className={styles.container}>
      <ToastContainer />
      
      {/* Кнопки навигации */}
      <div className={styles.topRight}>
        <button onClick={() => router.push("/account")} className={styles.navBtn}>
          Личный кабинет
        </button>
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
          }}
          className={styles.navBtn}
        >
          Выйти
        </button>
      </div>

      {/* Группы */}
      <div className={styles.buttons}>
        {groups.map((group) => (
          <button
            key={group}
            className={`${styles.groupBtn} ${selectedGroup === group ? styles.active : ""}`}
            onClick={() => setSelectedGroup(group)}
          >
            {group}
          </button>
        ))}
      </div>

      {/* ПК */}
      {selectedGroup === "Премиум" ? (
        <PremiumZones pcs={pcs} onBook={handleBook} />
      ) : (
        <PcGrid pcs={pcs} group={selectedGroup} onBook={handleBook} />
      )}
    </div>
  );
}
