import API from "./api";


// ORDER ITEM TYPE
export interface OrderItem {
  _id: string;

  quantity: number;

  price: number;

  product: {
    _id: string;

    title: string;

    image?: string;
  };
}


// SHIPPING ADDRESS TYPE
export interface ShippingAddress {
  fullName: string;

  mobile: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  country: string;
}


// ORDER TYPE
export interface Order {
  _id: string;

  createdAt: string;

  totalPrice: number;

  paymentStatus: string;

  orderStatus: string;

  shippingAddress: ShippingAddress;

  user: {
    name: string;

    email: string;
  };

  orderItems: OrderItem[];
}


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


// CREATE ORDER
export const createOrder =
  async (
    data: any
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.post(
        "/orders",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// GET MY ORDERS
export const getMyOrders =
  async (): Promise<Order[]> => {

    const token =
      getToken();

    const res =
      await API.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// GET SINGLE ORDER
export const getSingleOrder =
  async (
    id: string
  ): Promise<Order> => {

    const token =
      getToken();

    const res =
      await API.get(
        `/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// GET VENDOR ORDERS
export const getVendorOrders =
  async (): Promise<Order[]> => {

    const token =
      getToken();

    const res =
      await API.get(
        "/orders/vendor/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// UPDATE ORDER STATUS
export const updateOrderStatus =
  async (
    id: string,
    status: string
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.put(
        `/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// CREATE PAYMENT
export const createPayment =
  async (
    id: string
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.post(
        `/orders/payment/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// VERIFY PAYMENT
export const verifyPayment =
  async (
    data: any
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.post(
        "/orders/verify-payment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// DUMMY PAYMENT
export const dummyPayment =
  async (
    id: string
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.put(
        `/orders/dummy-pay/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// GET VENDOR EARNINGS
export const getVendorEarnings =
  async (): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.get(
        "/orders/vendor/earnings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

  export const getVendorDashboard =
  async () => {
    const res = await API.get(
      "/orders/vendor/dashboard",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    return res.data;
  };