import { useEffect } from "react";

import { useState } from "react";

import API from "../services/api";

import {
  getAllVendors,
  Vendor,
} from "../services/vendorService";

interface ApplyVendorData {
  shopName: string;

  shopDescription: string;
}

export default function useVendor() {

  // VENDORS
  const [
    vendors,
    setVendors,
  ] = useState<Vendor[]>([]);

  // LOADING
  const [loading, setLoading] =
    useState(true);

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

  // FETCH VENDORS
  const fetchVendors =
    async () => {
      try {
        const data =
          await getAllVendors();

        setVendors(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  // APPLY VENDOR
  const handleApplyVendor =
    async (
      payload: ApplyVendorData
    ) => {
      const res =
        await API.post(
          "/vendors/apply",
          payload,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

      return res.data;
    };

  useEffect(() => {
    fetchVendors();
  }, []);

  return {
    vendors,
    loading,
    fetchVendors,
    handleApplyVendor,
  };
}