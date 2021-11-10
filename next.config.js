/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
      apiUrl:
        process.env.NODE_ENV === "development"
          ? "https://todo-backend-clev.herokuapp.com/" // development api
          : "http://localhost:3000/api/data", // production api
    },
}
