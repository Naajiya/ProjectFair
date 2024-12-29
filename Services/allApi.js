import commonApi from './CommonApi';
import SERVER_URL from './ServerUrl';

// API for registering a user
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${SERVER_URL}/register`, reqBody);
};