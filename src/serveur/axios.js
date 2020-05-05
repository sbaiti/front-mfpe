import axios from 'axios'

const { mfpeToken } = window.localStorage
let authorisation = ''
if (mfpeToken) {
    authorisation = { Authorization: `Bearer ${mfpeToken}` }
} else {
    authorisation = ''
    console.log('no token')
}
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Accept-Version': 1,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        ...authorisation,
    },
    timeout: 500000,
})

export function Get(url) {
    const token = window.localStorage.mfpeToken
    instance.defaults.headers.Authorization = `Bearer ${
        window.localStorage.mfpeToken === token
            ? token
            : window.localStorage.mfpeToken
    }`

    return new Promise(resolve => {
        resolve(instance.get(url))
    })
}

export function Post(url, payload) {
    return new Promise(resolve => {
        resolve(instance.post(url, payload))
    })
}

export function Patch(url, payload) {
    return new Promise(resolve => {
        resolve(instance.patch(url, payload))
    })
}

export function Delete(url, payload) {
    return new Promise(resolve => {
        if (payload) {
            resolve(instance.delete(url, payload))
        } else {
            resolve(instance.delete(url))
        }
    })
}
export function Put(url, payload) {
    const token = window.localStorage.mfpeToken
    instance.defaults.headers.Authorization = `Bearer ${
        window.localStorage.mfpeToken === token
            ? token
            : window.localStorage.mfpeToken
    }`
    return new Promise(resolve => {
        resolve(instance.put(url, payload))
    })
}
const { interceptors, defaults } = instance
export default {
    Put,
    Get,
    Post,
    Patch,
    Delete,
    interceptors,
    defaults,
}
