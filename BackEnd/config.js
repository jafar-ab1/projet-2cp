const config = {
    db: {
    username: "yzamri",      
    password: "spDn6oyqXSEh9dQv",
    connectionString: "mongodb+srv://yzamri:spDn6oyqXSEh9dQv@cluster.mongodb.net/dbname"
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