const apiURI = "http://192.168.43.206:3000/sms";

export const getSms = () =>{
    return fetch(apiURI) ;
 }