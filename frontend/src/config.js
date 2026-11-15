import axios from "axios";

export const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

// The free Render backend sleeps when idle and takes up to ~1 minute to wake.
// Retry failed GET requests (network error / 502-504) so pages still load.
const MAX_RETRIES = 15;
const RETRY_DELAY_MS = 5000;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config;
    const status = error.response && error.response.status;
    const waking = !error.response || [502, 503, 504].includes(status);
    if (!cfg || cfg.method !== "get" || !waking) return Promise.reject(error);
    cfg.__retries = (cfg.__retries || 0) + 1;
    if (cfg.__retries > MAX_RETRIES) return Promise.reject(error);
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    return axios(cfg);
  }
);
