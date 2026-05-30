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


// VENDOR TYPE
export interface Vendor {
  _id: string;

  shopName: string;

  shopDescription: string;

  isApproved: boolean;

  user: {
    _id: string;

    name: string;

    email: string;

    role: string;
  };
}


// GET ALL VENDORS
export const getAllVendors =
  async (): Promise<
    Vendor[]
  > => {
    const res =
      await API.get(
        "/vendors/all",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// APPROVE VENDOR
export const approveVendor =
  async (
    id: string
  ): Promise<any> => {
    const res =
      await API.put(
        `/vendors/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };