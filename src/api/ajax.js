import axios from 'axios';

export default function Axios(url = '', params = {}, type = 'GET') {
    let axiosPromise;
    return new Promise((resolve,reject) => {
        if (type.toUpperCase() === "GET") { 
                let paramsStr = '';
                Object.keys(params).forEach(key => {
                    paramsStr += key + '=' + params.key + '&';
                });

                //去除尾部&
                if (paramsStr !== "") {
                    paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf("&"));
                }

                //拼接url
                url += "?" + paramsStr;

                //发起GET请求
                axiosPromise = axios.get(url);
            }
            else if(type.toUpperCase() === "POST") {
                axiosPromise = axios.post(url,params);
            }
            axiosPromise.then((response) => {
                //console.log(response.data);
                resolve(response.data);
            }).catch(err => { 
                reject(err)
            });
        }
    )
}