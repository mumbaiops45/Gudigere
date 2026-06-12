import API from "./api";

export const getDashboardStats =
  async () => {
    const token =
      localStorage.getItem("token");

    const res = await API.get(
      "/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };