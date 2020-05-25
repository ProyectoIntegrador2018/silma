export const apiHost = process.env.NODE_ENV === 'production' ?
  'api' :
  process.env.VUE_APP_API_HOST;
import axios from 'axios';

export const getRequest = async (endpoint, token = undefined, withFiles = false) => {
  try {
    const headerFile = withFiles ? { 'Content-Type': 'multipart/form-data' } : {};
    const headerToken = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${apiHost}/${endpoint}`, { headers: { ...headerFile, ...headerToken } });
    return response.data;
  } catch(error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const postRequest = async (endpoint, data, token = undefined, withFiles = false) => {
  try {
    const headerFile = withFiles ? { 'Content-Type': 'multipart/form-data' } : {};
    const headerToken = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${apiHost}/${endpoint}`, data, { headers: { ...headerFile, ...headerToken }});
    return response.data;
  } catch(error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const deleteRequest = async (endpoint, token = undefined, data, withFiles = false) => {
  try {
    const headerFile = withFiles ? { 'Content-Type': 'multipart/form-data' } : {};
    const headerToken = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.delete(`${apiHost}/${endpoint}`, { headers: { ...headerFile, ...headerToken }},data );
    return response.data;
  } catch(error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};