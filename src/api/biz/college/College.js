import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/College',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/College/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/College',
    method: 'put',
    data
  })
}

export default { add, edit, del }
