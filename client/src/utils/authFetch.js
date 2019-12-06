import logout from "./logout";

/**
 *
 * @param {String} url
 * @param {{}} body
 * @param {String} method
 */
export default async function authFetch(
  url,
  body,
  props,
  method = "get",
  contentType = "application/json"
) {
  const token = sessionStorage.getItem("authToken");
  const spotifyToken = sessionStorage.getItem("spotifyToken");
  const headers = new Headers();
  headers.set("accessToken", `Bearer ${token ? token : "no-auth"}`);
  headers.set("authorization", `Bearer ${spotifyToken}`);
  headers.set("profile", JSON.parse(sessionStorage.getItem("profile"))._id);
  if (contentType) {
    headers.set("content-Type", contentType);
    body = JSON.stringify(body);
  }
  let data =
    method === "get"
      ? await fetch(url, { headers, method })
      : await fetch(url, { headers, body, method });
  if (data.status === 403) return logout(props);
  data = await data.json();
  return data;
}
