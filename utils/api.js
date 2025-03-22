import axios from "axios";

const PROXY_URL = "http://94.232.247.58:3000/api/proxy";
const BASE_API = "https://eu16.icafecloud.com/api/v2/cafe/77289";

// Получить список ПК
export const fetchPCs = async () => {
  const { data } = await axios.post(PROXY_URL, {
    url: `${BASE_API}/base/query`,
    method: "GET",
    headers: {},
    body: null, // GET без body
  });
  return data?.data?.pcs_init?.pc_list || [];
};

// Забронировать ПК
export const bookPC = async (pc_name) => {
  await axios.post(PROXY_URL, {
    url: `${BASE_API}/pcs/action/setOutOfOrder`,
    method: "POST",
    headers: {},
    body: { pcs: [{ pc_name, pc_enabled: 1 }] },
  });
};

// Освободить ПК
export const unbookPC = async (pc_name) => {
  await axios.post(PROXY_URL, {
    url: `${BASE_API}/pcs/action/setOutOfOrder`,
    method: "POST",
    headers: {},
    body: { pcs: [{ pc_name, pc_enabled: 0 }] },
  });
};
