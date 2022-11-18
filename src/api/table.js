import request from '@/utils/requests'

export function simpleTableApi (data) {
  return request({
    url: '/table/simple',
    method: 'post',
    data
  })
}

export function tagsOptionApi () {
  return request({
    url: '/table/tags',
    method: 'post'
  })
}
