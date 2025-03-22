import styles from "../styles/styles.module.css";

export default function PcCard({ pc, onBook }) {
  if (!pc) return null;

  const getStatus = (pc) => {
    if (pc.pc_enabled === 0) return { text: "Забронирован", color: "#ff9800" };
    if (pc.status_connect_time_local) return { text: "Занят", color: "#f44336" };
    return { text: "Свободен", color: "#4caf50" };
  };

  const status = getStatus(pc);

  return (
    <div className={styles.card}>
      <div
        className={styles.statusBar}
        style={{ backgroundColor: status.color }}
      ></div>
      <strong>{pc.pc_name}</strong>
      <div>{status.text}</div>
      {status.text === "Свободен" && (
        <button className={styles.bookBtn} onClick={() => onBook(pc.pc_name)}>
          Забронировать
        </button>
      )}
    </div>
  );
}
