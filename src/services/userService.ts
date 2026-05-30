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


// USER TYPE
export interface User {
  _id: string;

  name: string;

  email: string;

  role: string;

  createdAt: string;
}


// GET USERS
export const getUsers =
  async (): Promise<
    User[]
  > => {

    const token =
      getToken();

    const res =
      await API.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };


// DELETE USER
export const deleteUser =
  async (
    id: string
  ): Promise<any> => {

    const token =
      getToken();

    const res =
      await API.delete(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };