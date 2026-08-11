import axiosInstance from "../utils/axiosInstance";

// user All URLS:-
export const userAllUrls = async () => {
  const {data} = await axiosInstance.get("/api/url/myAllUrls")
  return data;
}
