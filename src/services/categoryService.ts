import API from "./api";


// CATEGORY TYPE
export interface Category {
  _id: string;

  name: string;

  image: string;

  description: string;
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


// GET ALL CATEGORIES
export const getCategories =
  async (): Promise<
    Category[]
  > => {

    const res =
      await API.get(
        "/categories"
      );

    return (
      res.data.categories ||
      res.data.categories 
      
    );
  };


// GET SINGLE CATEGORY
export const getCategory =
  async (
    id: string
  ): Promise<Category> => {

    const res =
      await API.get(
        `/categories/${id}`
      );

    return res.data;
  };


// CREATE CATEGORY
export const createCategory =
  async (
    data: any
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.post(
        "/categories",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// UPDATE CATEGORY
export const updateCategory =
  async (
    id: string,
    data: any
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.put(
        `/categories/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// DELETE CATEGORY
export const deleteCategory =
  async (
    id: string
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.delete(
        `/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };