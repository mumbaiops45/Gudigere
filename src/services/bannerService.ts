import API from "./api";

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  placement: string;
  active: boolean;
  clicks: number;
  code?: string;
}

export const getBanners = async (placement?: string): Promise<Banner[]> => {
  const params = placement ? { placement } : {};
  const res = await API.get("/banners", { params });
  return (
    res.data?.banners ??
    res.data?.data ??
    (Array.isArray(res.data) ? res.data : [])
  );
};

export const trackBannerClick = async (id: string): Promise<void> => {
  await API.patch(`/banners/${id}/click`);
};
