import {myRequest} from './request.js'
//登录
export function login(data) {
  return myRequest({
    url: '/system/login',
    method: 'post',
    data: data,
	headers: {
		'loginClient':'app',
	}
  })
}
export const loginOut = () => {
    return myRequest({
        url: '/system/logout',
        method: 'POST',
    })
}