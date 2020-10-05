module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://kuwqhpzvijibkp:5b7d2fe5fa19f9e45437814d2366929b55ab6220a3dd244a11635e27d5328a16@ec2-18-210-180-94.compute-1.amazonaws.com:5432/daav0iv6g58qdd244a11635e27d5328a16@ec2-18-210-180-94.compute-1.amazonaws.com:5432/daav0iv6mk',
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 
      "https://kitchen-hero.kayleighkat98.vercel.app"
  }