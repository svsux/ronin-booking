// /utils/api.js
const PROXY_URL = "http://77.235.31.249:3001/proxy";

// Получить список ПК
export const fetchPCs = async () => {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: "/cafe/77289/base/query",
      method: "GET"
    })
  });

  const json = await res.json();
  return json?.data?.pcs_init?.pc_list || [];
};

// Забронировать ПК
export const bookPC = async (pc_name) => {
  await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: "/cafe/77289/pcs/action/setOutOfOrder",
      method: "POST",
      body: {
        pcs: [{ pc_name, pc_enabled: 1 }]
      }
    })
  });
};

// Снять бронь с ПК
export const unbookPC = async (pc_name) => {
  await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint: "/cafe/77289/pcs/action/setOutOfOrder",
      method: "POST",
      body: {
        pcs: [{ pc_name, pc_enabled: 0 }]
      }
    })
  });
};
