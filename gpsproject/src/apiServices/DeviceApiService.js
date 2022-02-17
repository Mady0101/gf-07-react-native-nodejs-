const apiURI = "http://192.168.43.206:3000/devices";

const createHeader = (jwtToken) =>{
  return new Headers({
    'Authorization': 'Bearer '+jwtToken, 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})
}



export const addDevice = (jwtToken,Device) =>{
    return fetch(apiURI+'/addDevice', {
        method: 'POST',
        headers: createHeader(jwtToken),
        body: JSON.stringify({
          number : Device.number,
          name : Device.name
        })
      })
 }

 export const updateDevice = (userId,Device) =>{
    return fetch(apiURI+'/'+userId, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id : Device._id,
          number : Device.number,
          name : Device.name
        })
      })
 }

 export const deleteDevice = (token,Device) =>{
    return fetch(apiURI+'/deleteDevice', {
        method: 'DELETE',
        headers:createHeader(token),
        body: JSON.stringify({
          _id : Device._id,
          number : Device.number,
          name : Device.name
        })
      })
 }