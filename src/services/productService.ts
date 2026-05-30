// import API from "./api";


// // TOKEN
// const getToken = (): string | null => {
//   if (
//     typeof window !==
//     "undefined"
//   ) {
//     return localStorage.getItem(
//       "token"
//     );
//   }

//   return null;
// };


// // PRODUCT TYPE
// export interface Product {
//   _id: string;

//   name: string;

//   description: string;

//   price: number;

//   stock: number;

//   images: string[];

//   vendor?: {
//     shopName: string;
//   };

//   category?: string | { name?: string; _id?: string };
// }


// // GET PRODUCTS
// export const getProducts =
//   async (): Promise<
//     Product[]
//   > => {
//     const res =
//       await API.get(
//         "/products"
//       );

//     return res.data;
//   };


// // DELETE PRODUCT
// export const deleteProduct =
//   async (
//     id: string
//   ): Promise<any> => {
//     const res =
//       await API.delete(
//         `/products/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//     return res.data;
//   };


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

  name: string;

  description: string;

  price: number;

  stock: number;

  images: string[];

  quantity?: number;

  vendor?: {
    shopName?: string;
  };

  category?:
    | string
    | {
        _id?: string;
        name?: string;
      };
}


// ==========================
// GET ALL PRODUCTS
// ==========================
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


// ==========================
// GET SINGLE PRODUCT
// ==========================
export const getSingleProduct =
  async (
    id: string
  ): Promise<Product> => {

    const res =
      await API.get(
        `/products/${id}`
      );

    return res.data;
  };


// ==========================
// DELETE PRODUCT
// ==========================
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