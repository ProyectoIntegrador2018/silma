export const apiHost =
  process.env.NODE_ENV === "production"
    ? "https://silma.herokuapp.com/api"
    : process.env.VUE_APP_API_HOST;
import axios from "axios";

export const getRequest = async (endpoint, withFiles = false) => {
  const headerFile = withFiles ? { "Content-Type": "multipart/form-data" } : {};
  const response = await axios.get(`${apiHost}/${endpoint}`, {
    headers: { ...headerFile }
  });
  return response.data;
};

export const postRequest = async (endpoint, data, withFiles = false) => {
  const headerFile = withFiles ? { "Content-Type": "multipart/form-data" } : {};
  const response = await axios.post(`${apiHost}/${endpoint}`, data, {
    headers: { ...headerFile }
  });
  return response.data;
};

export const patchRequest = async (endpoint, data, withFiles = false) => {
  const headerFile = withFiles ? { "Content-Type": "multipart/form-data" } : {};
  const response = await axios.patch(`${apiHost}/${endpoint}`, data, {
    headers: { ...headerFile }
  });
  return response.data;
};

export const deleteRequest = async (endpoint, data, withFiles = false) => {
  const headerFile = withFiles ? { "Content-Type": "multipart/form-data" } : {};
  const response = await axios.delete(
    `${apiHost}/${endpoint}`,
    { headers: { ...headerFile } },
    data
  );
  return response.data;
};
