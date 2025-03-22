import PcCard from "./PcCard";
import styles from "../styles/styles.module.css";

export default function PremiumZones({ pcs, onBook }) {
  const premiumZones = {
    Tokyo: pcs.filter((pc) => pc.pc_name.startsWith("Premium1")),
    Osaka: pcs.filter((pc) => pc.pc_name.startsWith("Premium2")),
    Kyoto: pcs.filter((pc) => pc.pc_name.startsWith("Premium3")),
    Hirosima: pcs.filter((pc) => pc.pc_name.startsWith("Premium4")),
  };

  return (
    <div className={styles.premiumWrapper}>
      {Object.entries(premiumZones).map(([zone, pcsInZone]) => (
        <div key={zone} className={styles.premiumZone}>
          <h2 className={styles.zoneTitle}>{zone}</h2>
          <div className={styles.grid}>
            {pcsInZone.map((pc) => (
              <PcCard key={pc.pc_ip} pc={pc} onBook={onBook} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

