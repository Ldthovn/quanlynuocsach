// import axios from 'axios'
// import { apiUrl } from '../config'
// import authenticationStore from '../stores/authenticationStore'

// const headersValue = {
//   'Authorization': `Bearer ${JSON.parse(authenticationStore.appToken).access_token}`,
//   'Content-Type': 'application/json',
// }

// const source = axios.CancelToken.source()

// export const requests = {
//   cancelRequest: () => {
//     source.cancel()
//   },
//   get: (url, params = false, responseType = false, search, responseValue) => {
//     if (params) {
//       return axios({
//         method: 'get',
//         url: `${apiUrl}${url}`,
//         headers: headersValue,
//         params: search,
//         cancelToken: source.token,
//       })
//     }
//     if (responseType) {
//       return axios({
//         method: 'get',
//         url: `${apiUrl}${url}`,
//         headers: headersValue,
//         responseType: responseValue,
//         cancelToken: source.token,
//       })
//     }
//     return axios({
//       method: 'get',
//       url: `${apiUrl}${url}`,
//       headers: headersValue,
//       cancelToken: source.token,
//     })
//   },
//   post: (url, body) => {
//     return axios({
//       method: 'post',
//       url: `${apiUrl}${url}`,
//       headers: headersValue,
//       data: body,
//       cancelToken: source.token,
//     })
//   },
//   delete: (url) => {
//     return axios({
//       method: 'delete',
//       url: `${apiUrl}${url}`,
//       headers: headersValue,
//       cancelToken: source.token,
//     })
//   },
//   put: (url, body) => {
//     return axios({
//       method: 'put',
//       url: `${apiUrl}${url}`,
//       headers: headersValue,
//       data: body,
//       cancelToken: source.token,
//     })
//   },
//   patch: (url, body) => {
//     return axios({
//       method: 'patch',
//       url: `${apiUrl}${url}`,
//       headers: headersValue,
//       data: body,
//       cancelToken: source.token,
//     })
//   },
// }
