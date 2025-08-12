import axios from "axios";

const API_BASE_URL =  "http://13.53.50.114:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function loginRestaurant(email, password) {
  try {
    const response = await apiClient.post("/restaurant/login", { email, password });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Login failed";
    const status = error?.response?.status || 500;
    throw new Error(`${status}: ${message}`);
  }
}

export async function getRestaurantProfile() {
  try {
    const token = localStorage.getItem("userToken");
    const response = await apiClient.get("/restaurant/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to fetch profile";
    const status = error?.response?.status || 500;
    throw new Error(`${status}: ${message}`);
  }
}


export async function redeemCoupon(userEmail, couponCode) {
  try {
    const token = localStorage.getItem("userToken");
    const response = await apiClient.post(
      "/restaurant/use-coupon",
      { userEmail, couponCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to use coupon";
    const status = error?.response?.status || 500;
    throw new Error(`${status}: ${message}`);
  }
}

export async function getRedemptionHistory(page = 1, limit = 10, startDate, endDate) {
  try {
    const token = localStorage.getItem("userToken");

    const params = { page, limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await apiClient.get("/restaurant/redemption-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to fetch redemption history";
    const status = error?.response?.status || 500;
    throw new Error(`${status}: ${message}`);
  }
}

export async function getRedemptionStats(period = 'all') {
  try {
    const token = localStorage.getItem("userToken");
    const response = await apiClient.get("/restaurant/redemption-stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { period },
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Failed to fetch redemption stats";
    const status = error?.response?.status || 500;
    throw new Error(`${status}: ${message}`);
  }
}

