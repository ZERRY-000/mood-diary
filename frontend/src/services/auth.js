const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const register = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // ส่ง cookie ไปด้วย
  });
  return res.json();
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  });
  return res.json();
};

export const logout = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: "GET",
    credentials: "include",
  });
};
