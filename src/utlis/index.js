import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
    formData
  );
  return data?.data?.display_url;
};

// save or update user in db

export const saveOrUpdateUser = async (userData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    userData
  );
  return res.data;
};
