module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL ||'postgresql://postgres@localhost/kitchen_hero',
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 
      "https://kitchen-hero.kayleighkat98.vercel.app"
  }