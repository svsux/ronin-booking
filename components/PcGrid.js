// components/PcGrid.js
import PcCard from "./PcCard";
import styles from "../styles/styles.module.css";

export default function PcGrid({ pcs, group, onBook }) {
  const filtered = pcs.filter((pc) => pc.pc_group_name === group);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.zoneTitle}>{group}</div>
      <div className={styles.grid}>
        {filtered.map((pc, i) => (
          <PcCard key={pc.pc_ip} pc={pc} onBook={onBook} index={i} />
        ))}
      </div>
    </div>
  );
}
