// utils/api.js
import axios from "axios";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNzMwYjQ5ZjJlYzEyZGYxNjNmY2JlMDUyNmM3ZGYyYTFkM2VmODU5YzlkZjBjOWYxMDMwNGQ2NTNmNWZiNzc3YTBiOGQxZDNjNDYyZWQ4ODciLCJpYXQiOjE3NDIzMjM2OTYuOTgzNjA4LCJuYmYiOjE3NDIzMjM2OTYuOTgzNjExLCJleHAiOjE3NzM4NTk2OTYuOTgxNzMsInN1YiI6IjM4NDExODk3NzE3NzI4OSIsInNjb3BlcyI6W119.l0GsxcQnHSdABErKnw15OBaPbteX9ygNCkyJcROMHDSh2Hl1KGJ8h2p4MjotgdPYhTm1VZV4LwL8jnW1LqPI1joGaiQAh5np9zV4Ayxw7AqTVDPlTaAS0x6z6-uQO02nupukwoFnbjqY_LuKKBvi-aHuuyg592sKJxn_7JpkUJkpeJ03eV8cd8Pz0GYc1iyV2MVmim9fF6y8UONxPKIoWkBdpdYNmt53QuCv4mUpu2FuwSR3VGRZs9cP8y4oLP_8leWVWDywu20mdmYBpjMYoQg6GCzi5QpnLSxEY4YyKBtOENZ7xE2OxYu1sj9GBVwPk-1Ed__3y7YaZByehckICZSy24nXK4e5zZkDP0kJTr6I227f3ZCRwDFeSSo2UmaOOwOwd8KXBqnKtJFA7x5a2m8xGO81nsso0kbXN4ZDM6i7PAzQfrJWCkog2RNzuw65ljU4UroFyCwGqYsZq-uod8jCvEiAzRwOk8m6MZ3Zj_5ys88jSPYHUpTXodPKl3vCHqrX5RiGQq7skM9fhujTEe7CTnC9f_W_9EwYCAVUvwafGqpXBE0RSsAnj0lHl4fbgw7aRhO7UNY-9UP4KkysByMPFAIXpSWia9AkSzgzG0FQXIOX7ZMckGmmmqhy2YpBX8mSYpmkPSKQJkD9zgfsNUX7cfs0i7lpF_dvPlAC860";

export const fetchPCs = async () => {
  const { data } = await axios.get("https://eu16.icafecloud.com/api/v2/cafe/77289/base/query", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data?.data?.pcs_init?.pc_list || [];
};

export const bookPC = async (pc_name) => {
  await axios.post(
    "https://eu16.icafecloud.com/api/v2/cafe/77289/pcs/action/setOutOfOrder",
    { pcs: [{ pc_name, pc_enabled: 1 }] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const unbookPC = async (pc_name) => {
  await axios.post(
    "https://eu16.icafecloud.com/api/v2/cafe/77289/pcs/action/setOutOfOrder",
    { pcs: [{ pc_name, pc_enabled: 0 }] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
