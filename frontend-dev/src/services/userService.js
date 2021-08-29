const axios = require('axios')

// -- TOKEN USED IN SOME REQUESTS

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// --- CREATE A NEW USER

const signUp = async (credentials) => {
  const response = await axios.post(
    'http://localhost:3001/api/users',
    credentials
  )
  return response.data
}

export default {
  signUp,
  setToken,
}
