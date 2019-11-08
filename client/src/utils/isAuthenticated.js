export default function isAuthenticated() {
  return localStorage.getItem("authToken") ? true : false; // Here we will verify if the token is valid with the backend
}
