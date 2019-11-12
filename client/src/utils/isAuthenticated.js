export default function isAuthenticated() {
  return sessionStorage.getItem("authToken") &&
    sessionStorage.getItem("credentials")
    ? true
    : false;
}
