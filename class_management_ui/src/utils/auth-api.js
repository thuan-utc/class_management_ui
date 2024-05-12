import axios from "axios"
import Router from "../router"
import { jwtDecode } from "jwt-decode"

const ACCESS_TOKEN_KEY = 'accessToken'
const USER_NAME = 'username'
const AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`

export {
  login, signup, logout, sendMailResetPassword, resetPassword, verifyCode
};

async function login(credential) {
  return await axios.post(`${AUTH_URL}/login`, credential).then((response) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY])
    localStorage.setItem(USER_NAME, credential.username)
    Router.push("/dashboard")
  })
}

async function signup(newUser) {
  const response = await axios.post(`${AUTH_URL}/signup`, newUser);
  return response;
}

async function verifyCode(user) {
  const response = await axios.put(`${AUTH_URL}/active-account`, user);
  return response;
}

async function sendMailResetPassword(email) {
  return await axios.get(`${AUTH_URL}/send-mail-forgot-password?email=${email}`)
}

async function resetPassword(request) {
  return await axios.put(`${AUTH_URL}/reset-password`, request)
}

function logout() {
  clearAccessToken()
  Router.push("/login")
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function isLoggedIn() {
  const token = getAccessToken()
  return !!token && !isTokenExpired(token)
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

function getTokenExpirationDate(encodedToken) {
  const token = jwtDecode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}