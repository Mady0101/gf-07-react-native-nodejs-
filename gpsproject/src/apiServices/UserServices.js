


const apiURI = "http://192.168.43.206:3000/auth";

const createHeader = (jwtToken) =>{
  return new Headers({
    'Authorization': 'Bearer '+jwtToken, 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})
}

export const addUser = (User) =>{
    return fetch(apiURI+"/signup", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: User.username,
    password: User.password
  })
})
}

export const getUser = (username , password) =>{
   return fetch(apiURI+"/login",{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
   }) ;
}

export const resetPassword = (jwt,password,currentPassword)=>{
  return fetch("http://192.168.43.206:3000/users/resetPassword",{
    method: 'PUT',
    headers:createHeader(jwt),
    body: JSON.stringify({
      currentPassword: currentPassword,
      password: password
    })
  })
}


