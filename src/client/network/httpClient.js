import axios from 'axios';
import { environment } from './env.dev';
axios.defaults.baseURL = 'https://api.spaceXdata.com';

const responseBody = (response) => response.data;
// adding interceptors
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptors
axios.interceptors.response.use(
  function (response) {    
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Exposing http methods so that components can use it ..
const http = {
  get: async (endpoint, params) => {
    const param = createParams(params);
    try {
      const res = await axios.get(axios.defaults.baseURL + endpoint + param);
      return responseBody(res);
    } catch (err) {
      return {
        error: true,
        errorData: err,
      };
    } finally {
      console.log('api call done');
    }
  },
  // Similarly other http methods can be used here
};

//   Dynamically create params
const createParams = (params) => {
  let str = '';
  let totalParams = Object.keys(params);
  let len = totalParams.length;

  if (len) {
    str = '?';
    for (let i = 0; i < len; i++) {
      if (i === len - 1) str += totalParams[i] + '=' + params[totalParams[i]];
      else {
        str += totalParams[i] + '=' + params[totalParams[i]] + '&';
      }
    }
  }
  return str;
};

export default {
  http,
};
