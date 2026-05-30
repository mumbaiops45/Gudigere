import API from "./api";


// TOKEN
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


// PRODUCT TYPE
export interface Product {
  _id: string;

  title: string;

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

  createdAt?: string;

  updatedAt?: string;
}   


// CREATE PRODUCT
export const createProduct =
  async (
    data: any
  ): Promise<any> => {

    const res =
      await API.post(
        "/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// GET PRODUCTS
export const getProducts =
  async (): Promise<
    Product[]
  > => {

    const res =
      await API.get(
        "/products"
      );

    return res.data;
  };


// DELETE PRODUCT
export const deleteProduct =
  async (
    id: string
  ): Promise<any> => {

    const res =
      await API.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// UPDATE PRODUCT
export const updateProduct =
  async (
    id: string,
    data: any
  ): Promise<any> => {

    const res =
      await API.put(
        `/products/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// UPLOAD IMAGE
export const uploadProductImage =
  async (
    id: string,
    formData: FormData
  ): Promise<any> => {

    const res =
      await API.post(
        `/products/upload/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };