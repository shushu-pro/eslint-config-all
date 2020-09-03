/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import {
  extend
} from 'umi-request';
import {
  message
} from 'antd';
import router from 'umi/router';
import qs from 'qs';
import {
  LOGOUT_URL
} from '@/contants';
// AJAX 请求超时时间，单位秒
// const REQUEST_TIMEOUT = 20;

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const {
    response = {}
  } = error;
  const {
    status
  } = response;
  const err = {
    msg: (error.data && error.data.msg)
  }
  if (status === 401) {
    // notification.error({
    //   message: '未登录或登录已过期，请重新登录。',
    // });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    // window.g_app._store.dispatch({
    //   type: 'login/logout',
    // });
    err.msg = err.msg|| '未登录或登录已过期，请重新登录。'
    return Promise.reject(err);
  }
  if (status === 403) {
    router.push('/manage/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/manage/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/manage/exception/404');
    return;
  }
  return Promise.reject(err);
};


/**
 * code: 0 为请求成功
 */

function request1(url, {
  method = 'get',
  ...options
} = {}) {
  const request = extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
  });
  return request(url, {
      method,
      ...options,
      headers: {
        xhrFields: {
          withCredentials: true
        },
        Pragma: 'no-cache',
        // TODO: 需要去掉
        // "guest": ENV === 'site',
        'Content-Type': options.contentType || 'application/json;charset=utf-8'
      },
    })
    .then((res) => {
      if (res && (res.code === 3 || res.code === 2)) {
        window.location.href = LOGOUT_URL;
      }
      return res || {};
    })
    .then((res) => {
      if(!options.contentType){
        if (JSON.stringify(res) !== "{}") {
          return res
        } else {
          return Promise.reject(res);
        }
      }else{
        return res;
      }
    })
    .catch(err => {
      // 因为msg中可能有&ldquo;这样的字符需要转义
      // err.msg = decodeHtml(err.msg);
      message.error(err.msg || '请求失败， 请稍后重试');
      return Promise.reject(err);
    });
}
/**
 * get请求
 * @param {string} url      请求的url地址
 * @param {object} params   请求传递数据
 * @param {object} options  其他参数
 */
export function get(url, params, options) {
  if (!params || JSON.stringify(params) === '{}') {
    return request1(url, options);
  }
  if (url.indexOf('?') === -1) {
    return request1(`${url}?${qs.stringify(params)}`, options);
  }
  return request1(`${url}&${qs.stringify(params)}`, options);
}


/**
 * post请求
 * @param {string} url      请求的url地址
 * @param {object} params   请求传递数据
 * @param {object} options  其他参数
 */
export function post(url, params, options) {
  return request1(url, {
    ...options,
    method: 'post',
    data: params,
  });
}

/**
 * delete请求
 * @param {string} url      请求的url地址
 * @param {object} params   请求传递数据
 * @param {object} options  其他参数
 */
export function deleteRes(url, params, options) {
  return request1(url, {
    ...options,
    method: 'delete',
    data: params,
  });
}

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
