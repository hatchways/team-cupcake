import logout from "./logout";

/**
 *
 * @param {String} url
 * @param {{}} body
 * @param {String} method
 */
export default async function authFetch(url, body, props, method = "get") {
  const token = sessionStorage.getItem("authToken");
  let data = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      "content-type": "application/json",
      accessToken: `Bearer ${token ? token : "no-auth"}`
    })
  });
  if (data.status === 403) return logout(props);
  data = await data.json();
  return data;
}
