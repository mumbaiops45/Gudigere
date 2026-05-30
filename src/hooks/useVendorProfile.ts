import { useState } from "react";

import {
  getVendorProfile,
  VendorProfile,
} from "../services/vendorProfileService";

export default function useVendorProfile() {

  const [
    vendor,
    setVendor,
  ] =
    useState<VendorProfile | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  // FETCH
  const fetchVendorProfile =
    async () => {

      try {

        const data =
          await getVendorProfile();

        setVendor(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return {
    vendor,
    loading,
    fetchVendorProfile,
  };
}