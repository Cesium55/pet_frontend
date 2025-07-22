import {jwtDecode} from 'jwt-decode'
import config from './config'

function getAccessToken() {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === 'access_token') {
            return decodeURIComponent(value)
        }
    }
    return null
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

async function tryRefreshToken() {
    try {
        const res = await fetch(config.refresh_token_url, {
            method: 'POST',
            credentials: 'include',
        })
        return res.ok
    } catch (e) {
        eraseCookie("access_token")
        console.error('Token refresh failed:', e)
        return false
    }
}

async function authFetch(input, init = {}) {
    let token = getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        headers.set('Content-Type', `application/json`)
    }

    let response = await fetch(input, {
        ...init,
        headers,
        credentials: 'include',
    })

    if (response.status === 401) {
        const refreshed = await tryRefreshToken()
        if (refreshed) {
            token = getAccessToken()
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                response = await fetch(input, {
                    ...init,
                    headers,
                    credentials: 'include',
                })
            }
        }
    }

    return response
}


function decodeUserIdFromToken() {
    const token = getAccessToken()
    if (!token) {
        console.log("no token")
        return null
    }

    try {
        const payload = jwtDecode(token)
        return payload.sub || payload.id || null
    } catch (e) {
        return null
    }
}


async function logout() {
    eraseCookie("access_token")
    const response = await fetch(config.logout_url, {method:"post", credentials:"include"})
    return response
}

export { getAccessToken, tryRefreshToken, authFetch, decodeUserIdFromToken, logout }