import axios from "axios";
import qs from "qs";
import router from "../router";
// axios.defaults.baseURL = ''  //正式
// axios.defaults.baseURL = 'http://localhost:9090' //测试
axios.defaults.timeout = 50000;


axios.interceptors.request.use(config => {
  //拦截所有请求，添加登陆用户的token
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config
})


axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status == '401') {
    router.push("/index/login");
  } else {
    return Promise.reject(error)
  }
})

export default {
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: qs.stringify(data),
      }).then(res => {
        resolve(res.data)
      })
        .catch(err => {
          reject(err)
        });
    })
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data: qs.stringify(data),
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        });
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data),
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        });
    })
  },

  get(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
};

