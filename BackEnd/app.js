const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const config = require('./config');

// Importation des routes
const authRoutes = require('./server/routes/authRoutes');
const roomRoutes = require('./server/routes/roomRoutes');
const feedBackRoutes = require('./server/routes/feed_backRoutes');
const floorRoutes = require('./server/routes/floorRoutes');
const occupationRoutes = require('./server/routes/occupationRoutes');
const paymentRoutes = require('./server/routes/paymentRoutes');
const reservationRoutes = require('./server/routes/reservationRoutes');
const settingsRoutes = require('./server/routes/settingsRoutes');
const userRoutes = require('./server/routes/userRoutes');
const dealRoutes = require('./server/routes/dealRoutes');
const cleaningRoutes = require('./server/routes/cleaningRoutes');

const app = express();
const port = config.port;


app.use(cors());
app.use(express.json());

// Connexion à MongoDB
<<<<<<< HEAD
mongoose.connect(config.db.connectionString, {
  
})  
=======
mongoose.connect(config.db.connectionString)
>>>>>>> 4b203ab9495f15ae9a33adebd112bacfe609fecf
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));



// Utilisation des routes
app.use('/auth', authRoutes); 
app.use('/rooms', roomRoutes);
app.use('/feed_backs', feedBackRoutes);
app.use('/floor', floorRoutes);
app.use('/occupation', occupationRoutes);
app.use('/payment', paymentRoutes);
app.use('/reservation', reservationRoutes);
app.use('/settings', settingsRoutes);
app.use('/user', userRoutes);
app.use('/deal', dealRoutes);
app.use('/cleaning', cleaningRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: "internal server error" });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});