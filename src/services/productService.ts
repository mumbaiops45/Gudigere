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
export const getVendorProducts = async (): Promise<Product[]> => {
  const res = await API.get("/vendor/products", {
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
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products");
  return res.data;
};

export const getSingleProduct = async (id: string): Promise<Product> => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};