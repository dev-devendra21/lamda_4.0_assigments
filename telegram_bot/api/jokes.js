const { Axios } = require("../axios");

async function jokesApi() {
  const result = await Axios(
    "GET",
    "https://jokes-always.p.rapidapi.com/engineer",
    {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": process.env.JOKES_API_HOST,
    },
    {}
  );

  return result;
}

module.exports = {
  jokesApi,
};
