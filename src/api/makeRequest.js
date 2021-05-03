
export const makeRequest = async (url, param) => {
    let response = await fetch(`${url}${param}`);
    if (!response.ok) {
         throw new Error(`Looks like there was a problem. 
                         Status Code: ${response.status}`);
    }
    return response.json();
};