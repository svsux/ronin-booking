import axios from "axios";

// Токен для iCafe API
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjc3NDJjMzAwMDBkYWU1ZDAyYTUyOTdhNzVhYTgxMGZjMjQ0ZTcwM2QwNDI5YmUxZDE5OWJkODAyNmVjZDIyZDFlODkwNjExZDcxZjEwMTAiLCJpYXQiOjE3NDI2MDgzOTEuNDMzMzA1LCJuYmYiOjE3NDI2MDgzOTEuNDMzMzA4LCJleHAiOjE3NzQxNDQzOTEuNDMxMzQ4LCJzdWIiOiIzODQxMTg5NzcxNzcyODkiLCJzY29wZXMiOltdfQ.pJeKrg5EDdo6kYefWOkJ3ZnITNX0rW99GuCUzu5efqSXLSwlvyIFjLImnezJIvT_-zFHxUqAethpefHRMM-OxaaRHUaDPIjRdRQBb1nvzAk9yqjOXw0Ihl0ynefG6Yw8DFgWoJNHgl2FFYASzWuHo6PWCjyj1XRwThSPSV-KzYGuHG3GoVnlwi3S4hubClAFKGGUZ-l2l6w7H2QLQWWINakeyUFQ_I-OR9aNc22Uj1Tp4SOPHaPJkFWc5rYcN5MzdBi3pmEqFzEe9Py7cm6GZi4S19ZO1mI6EJcw9wsXWaSZ8JdDgg66IWRzzz-bWzVmWBmXGTU0-Mk_lC2eB6B2RNpW1ZXepBvRbKExapV4UJfIGCi62wfae8cwllb2p3wUs1sJlk8EliPdiGsJsJ0Zv5DDfvu9LRl0n4x3b7pe9XCErMKUHu368w1nBsiujd-iJOpN00uwTdqnThdD3_1H6sLOdZF93Bwh6yAyiC-i2uiXPQedRwD48LUb7dURD_Qr_r711PIq_gRWPQvUlwcXLBcmb9iA4dU0e8vV6QERzqV2CaQzCKlzHEoL63gSj4ufhEcL0n93ONpU_VK9se5YhNzqFuX1IhW4-l9UYwQqVWcjOoUnvQVI2JgAAL2bcsDihaOOEvQ_EMLGIk-M4RXbnTwi0BFuC_evr2EetJN3Up4";

// Прокси-сервер
const PROXY_URL = "http://94.232.247.58:3001/proxy"; // Используем прокси-сервер

export const fetchPCs = async () => {
  const { data } = await axios.post(PROXY_URL, {
    endpoint: "/cafe/77289/base/query", // Запрашиваем данные о ПК
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data?.data?.pcs_init?.pc_list || [];
};

export const bookPC = async (pc_name) => {
  await axios.post(
    PROXY_URL,
    {
      endpoint: "/cafe/77289/pcs/action/setOutOfOrder",
      body: { pcs: [{ pc_name, pc_enabled: 1 }] }
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const unbookPC = async (pc_name) => {
  await axios.post(
    PROXY_URL,
    {
      endpoint: "/cafe/77289/pcs/action/setOutOfOrder",
      body: { pcs: [{ pc_name, pc_enabled: 0 }] }
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
