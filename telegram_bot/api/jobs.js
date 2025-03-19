const { Axios } = require("../axios");

async function jobsApi(title) {
  const result = await Axios(
    "GET",
    "https://linkedin-jobs-api2.p.rapidapi.com/active-jb-24h",
    {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": process.env.JOBS_API_HOST,
    },
    {
      title_filter: title,
      location_filter: "India",
      type_filter: "FULL_TIME, INTERN",
    }
  );

  return result;
}

module.exports = {
  jobsApi,
};
