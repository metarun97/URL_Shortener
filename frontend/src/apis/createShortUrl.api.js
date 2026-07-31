// import axios from "axios"
import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (url) => {
  const res = await axiosInstance.post('/api/url/create', {
    full_url: url,
  })
  if (res.status === 409) {
    throw new Error("Url alredy exists")
  } else {
    const { short_url } = res.data.newUrl;
    return short_url;
  }
}
