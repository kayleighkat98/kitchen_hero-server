module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'https://fierce-hollows-91839.herokuapp.com/',
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 
      "https://kitchen-hero.kayleighkat98.vercel.app"
  }