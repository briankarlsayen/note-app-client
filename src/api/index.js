// import axios from "axios";
import api from '../axios';
import { Toast } from './middleware';
// import server_url from './server_url';

const headerAuth = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      authorization: `${localStorage.getItem('token')}`,
    },
  };
};

const apiErrorAlert = (status, message) => {
  switch (status) {
    case 204:
      Toast.fire({ icon: 'error', title: 'Server not responding' });
      break;
    case 401:
      Toast.fire({ icon: 'warning', title: message });
      break;
    case 403:
      Toast.fire({ icon: 'warning', title: 'Please relogin.' });
      break;
    case 404:
      Toast.fire({ icon: 'error', title: 'Server cannot be found' });
      break;
    case 405:
      Toast.fire({ icon: 'warning', title: message });
      break;
    case 422:
      Toast.fire({ icon: 'warning', title: message });
      break;
    case 502:
      Toast.fire({ icon: 'error', title: 'Server Error' });
      break;
    case 12023:
      Toast.fire({ icon: 'error', title: message });
      break;
    default:
      Toast.fire({
        icon: 'error',
        title: `Returned error request ${status}!. Please try again later`,
      });
      break;
  }
};

export const routesPostApi = async (routeName, params) => {
  return api
    .post(routeName, params, headerAuth())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? 'Server Maintenance!'
          : err.response.data.message;
      apiErrorAlert(status, message);
      return {
        data: {},
        status,
      };
    });
};

export const routesPutApi = async (routeName, params) => {
  return api
    .put(routeName, params, headerAuth())
    .then((result) => {
      return {
        data: result.data,
        status: result.status,
      };
    })
    .catch((err) => {
      const status = err.response === undefined ? 12023 : err.response.status;
      const message =
        err.response === undefined
          ? `Can't connect to server`
          : err.response.data.message;
      apiErrorAlert(status, message);
      return {
        data: err.response.data.message,
        status,
      };
    });
};

export const routesGetApi = async (routeName) => {
  return api
    .get(routeName, headerAuth())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('err', err);
      const status = err.response === undefined ? 12023 : err.response.status;
      const message = err.response.data.message;
      apiErrorAlert(status, message);
      const response = {
        data: {},
        status: err.response.status,
      };
      return response;
    });
};

export const routesDeleteApi = async (routeName) => {
  return api
    .delete(routeName, headerAuth())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const response = {
        data: {},
        status: error.response.status,
      };
      return response;
    });
};

// export const routesGetAllApi = async (routeName) => {
//   return axios.all(routeName.map((apiRoute) => api.get(apiRoute, headerAuth())))
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       const status = err.response === undefined ? 12023 : err.response.status;
//       const message = err.response.data.message
//       apiErrorAlert(status, message);
//       const response = {
//         data: {},
//         status: err.response.status,
//       };
//       return response;
//     });
//     // .get(routeName, headerAuth())

// };

// export const routesGetNoHoc = async (routeName) => {
//   return axios.create({
//     baseURL: server_url,
//   }).get(routeName, headerAuth())
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       const status = err.response === undefined ? 12023 : err.response.status;
//       const message = err.response.data.message
//       apiErrorAlert(status, message);
//       const response = {
//         data: {},
//         status: err.response.status,
//       };
//       return response;
//     });
// };
