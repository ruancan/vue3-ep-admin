import request from '@/utils/requests'
import qs from 'qs'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function userInfo (data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}
export function logout (data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
