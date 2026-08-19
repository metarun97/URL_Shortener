/* Imported items */
import axiosInstance from "../utils/axiosInstance";


/* Create shortUrl for user */
export const createShortUrl = async (url) => {
  const res = await axiosInstance.post('/api/url/create', {
    full_url: url,
  })
  const { short_url } = res.data.newUrl;
  return short_url;
}

// user All URLS:-
export const userAllUrls = async () => {
  const { data } = await axiosInstance.get("/api/url/myAllUrls")
  return data;
}

// delete a single URL:-
export const deleteSingleUrl = async (id) => {
  await axiosInstance.delete(`/api/url/${id}`);
}
