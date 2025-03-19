const axios = require("axios");

async function fetchData(options) {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function Axios(method, url, headers, params = {}) {
  const options = {
    method,
    url,
    params,
    headers: {
      ...headers,
    },
  };

  return fetchData(options);
}

module.exports = {
  Axios,
};
