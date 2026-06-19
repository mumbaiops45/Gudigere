import API from "./api";

export interface Coupon {
  _id: string;
  code: string;
  title: string;
  description?: string;
  image?: string;
  discountType: "percentage" | "fixed";
  discount: number;
  minPrice: number;
  maxDiscount?: number | null;
  days: string[];
  startTime?: string;
  endTime?: string;
  startDate?: string | null;
  endDate?: string | null;
  usageLimit?: number | null;
  usedCount: number;
  active: boolean;
}

// NOTE: Add this public route to your backend coupon router (no auth middleware):
//   router.get("/active", async (req, res) => {
//     const coupons = await Coupon.find({ active: true });
//     res.json({ coupons });
//   });
export const getActiveCoupons = async (): Promise<Coupon[]> => {
  const res = await API.get("/coupons/active");
  return (
    res.data?.coupons ??
    res.data?.data ??
    (Array.isArray(res.data) ? res.data : [])
  );
};

export const applyCoupon = async (
  code: string,
  cartTotal: number
): Promise<{ discount: number; finalTotal: number; message: string }> => {
  const res = await API.post("/coupons/apply", { code, cartTotal });
  return res.data;
};
