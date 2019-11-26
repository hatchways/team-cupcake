export async function getRemoteData(endpoint) {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      });
  });
}
