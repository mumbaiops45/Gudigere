import API from "./api";


// GET TOKEN
const getToken = (): string | null => {

  if (
    typeof window !==
    "undefined"
  ) {
    return localStorage.getItem(
      "token"
    );
  }

  return null;
};


// GET DASHBOARD DATA
export const getVendorDashboard =
  async () => {

    const token =
      getToken();

    const [
      earningsRes,
      ordersRes,
      productsRes,
    ] = await Promise.all([

      API.get(
        "/orders/vendor/earnings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),

      API.get(
        "/orders/vendor/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),

      API.get(
        "/products/vendor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    ]);

    return {
      earnings:
        earningsRes.data,

      orders:
        ordersRes.data,

      products:
        productsRes.data,
    };
  };