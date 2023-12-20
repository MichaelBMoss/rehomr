import sendRequest from "./send-request";

export function getAll(baseURL) {
  return sendRequest(baseURL);
}

export function getById(baseURL, id) {
  return sendRequest(`${baseURL}/${id}`);
}

export function getOrgsPets(baseURL, id) {
  return sendRequest(`${baseURL}/${id}`)
}
