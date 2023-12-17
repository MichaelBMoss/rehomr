import sendRequest from "./send-request";
const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function getAll(baseURL) {
  return sendRequest(baseURL);
}

export function getById(baseURL, id) {
  return sendRequest(`${baseURL}/${id}`);
}