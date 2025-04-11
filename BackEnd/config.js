const config = {
    db: {
    username: "yzamri",      
    password: "W6HgmUQyXc7pDGzB",
    connectionString: "mongodb+srv://yzamri:W6HgmUQyXc7pDGzB@cluster0.g0qinpa.mongodb.net/"
  },

  port: 3000,
  jwt: {
    keys: {
      secret: "Jonas_jonas_younes_younes_", 
      expiresIn: '1h'
    }
  },
};

module.exports= config;