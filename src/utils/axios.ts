import axios from 'axios';
import qs from 'qs';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: { serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }) },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.defaults.headers.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMGViMDI2NTAxOWVjZmM1ZTQzZDE4ZDQ3MmViYjczYjpiNTQ5OTViM2M2NzciLCJ1c2VySWQiOiJhYTk1NWVjMGRkZGRhM2NjZWQ1NWRiYTM5MmFiOWYwODoyMSIsImlhdCI6MTY2NjUwMTk2Nn0.IZnl0c_M-h7V-stmxJ7DnQJWbZCv2lBYnmAPAGn9LP0';

export default axiosInstance;
