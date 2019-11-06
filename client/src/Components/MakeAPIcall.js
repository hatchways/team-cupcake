export async function getAlbumData(endpoint){
    return new Promise((resolve, reject) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
            resolve(data)
        })
    })
}