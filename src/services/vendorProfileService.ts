import API from "./api";


// TOKEN
const getToken = () => {

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


// TYPE
export interface VendorProfile {
  _id: string;

  shopName: string;

  shopDescription: string;

  shopLogo: string;

  isApproved: boolean;

  user: {
    name: string;

    email: string;

    role: string;
  };
}


// GET PROFILE
export const getVendorProfile =
  async (): Promise<VendorProfile> => {
    const res = await API.get("/vendors/me", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  };


// UPDATE PROFILE
export const updateVendorProfile =
  async (payload: {
    shopName: string;
    shopDescription: string;
    shopLogo?: string;
  }): Promise<VendorProfile> => {
    const res = await API.put("/vendors/me", payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  };