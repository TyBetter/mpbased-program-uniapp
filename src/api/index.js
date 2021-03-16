import Axios from './ajax';

const baseURL = '127.0.0.1:8000/database/'

// export const getTodos = (url) => {
//     return Axios(url);
// }

export function getNames(url='') {
    return Axios(baseURL+url);
}