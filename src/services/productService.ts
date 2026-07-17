import API from "./api";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Complete Product interface matching your schema
export interface Product {
  _id: string;
  vendor: string | { _id: string; shopName: string };
  title: string;           // ✅ changed from 'name'
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  age: number;
  createdAt: string;
  updatedAt: string;
}

// Vendor-specific product endpoints (with auth)
// export const getVendorProducts = async (): Promise<Product[]> => {
//   const res = await API.get("/vendor/products", {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return res.data;
// };
export const getVendorProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products/vendor", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return res.data;
};

export const createProduct = async (payload: any): Promise<Product> => {
  const res = await API.post("/vendor/products", payload, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const updateProduct = async (id: string, payload: any): Promise<Product> => {
  const res = await API.put(`/vendor/products/${id}`, payload, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const res = await API.delete(`/vendor/products/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const adminDeleteProduct = async (id: string): Promise<any> => {
  const res = await API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// Optional: public product endpoints (if needed)
export const getAllProducts = async (
  age?: string,
  search?: string,
  category?: string,
  brand?: string,
  minPrice?: number,
  maxPrice?: number,
  sort?: string
): Promise<Product[]> => {

  const params: any = {};

  if (age) params.age = age;
  if (search) params.search = search;
  if (category) params.category = category;
  if (brand) params.brand = brand;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;
  if (sort) params.sort = sort;

  const res = await API.get("/products", {
    params,
  });

  return res.data;
};

export const getSingleProduct = async (id: string): Promise<Product> => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export interface Review {
  _id: string;
  user: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const res = await API.get(`/products/${productId}/reviews`);
  return res.data;
};

export const createReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  const token =
    localStorage.getItem("token");

  const res = await API.post(
    `/products/${productId}/reviews`,
    {
      rating,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ===============================
// GET DEAL OF THE DAY
// ===============================
export const getDealOfTheDay = async () => {
  const res = await API.get("/products/deal-of-the-day");
  return res.data;
};