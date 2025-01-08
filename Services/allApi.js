import commonApi from './CommonApi';
import SERVER_URL from './ServerUrl';

// API for registering a user
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${SERVER_URL}/register`, reqBody);
};

// user login
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${SERVER_URL}/login`, reqBody)
};

// add project to db
export const addProject = async (reqHeader, reqBody) => {
  return await commonApi("POSt", `${SERVER_URL}/add-project`, reqHeader, reqBody)
};

// get project from db
export const getHomeProject = async () => {
  return await commonApi("GET", `${SERVER_URL}/home-project`,"")
};

// get all project
export const getAllProject = async (reqHeader) => {
  return await commonApi("GET", `${SERVER_URL}/get-all-project`,"",reqHeader)
};

// get project by usesr
export const getUserProject = async (reqHeader) => {
  return await commonApi("GET", `${SERVER_URL}/get-user-project`,"", reqHeader)
};

// update project
export const editProjectApi = async (pid,reqBody,reqHeader)=>{
  return await commonApi("PUT", `${SERVER_URL}/edit-project/${pid}`, reqBody, reqHeader)
}

// delete project
export const deleteProject = async (pid,reqHeader)=>{
  return await commonApi("DELETE",`${SERVER_URL}/delete-project/${pid}`,{},reqHeader)
}

// update profile={}
export const updateProfile = async (reqHeader,reqBody)=>{
  return await commonApi("PUT",`${SERVER_URL}/edit-profile`,reqHeader,reqBody) 
}
