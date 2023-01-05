import request from "@/utils/request";

export function loginByUsername(username, password, kaptchaKey, code, openid) {
  const data = {username, password, kaptchaKey, code, openid};
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function loginByMobile(mobile, code, openid) {
  const data = {mobile, code, openid}
  return request({
    url: '/auth/login_mobile',
    method: 'post',
    data
  })
}
export function loginByWx(openid) {
  const data = {openid}
  return request({
    url: '/auth/login_wx',
    method: 'post',
    data
  })
}

export function sendCode(mobile) {
  const data = {mobile}
  return request({
    url: '/auth/sendCode',
    method: 'post',
    data
  })
}

export function loginNoKaptcha(username, password, kaptchaKey, code) {
  const data = {
    username,
    password,
  };
  return request({
    url: "/auth/loginNoKaptcha",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

export function getUserInfo(token) {
  return request({
    url: "/auth/info",
    method: "get",
    params: { token },
  });
}

export function getKaptcha() {
  return request({
    url: "/auth/kaptcha",
    method: "get",
  });
}
