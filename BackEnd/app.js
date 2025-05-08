const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const config = require('./config');

// Importation des routes
const authRoutes = require('./server/routes/authRoutes');
const roomRoutes = require('./server/routes/roomRoutes');
const feedBackRoutes = require('./server/routes/feed_backRoutes');
const floorRoutes = require('./server/routes/floorRoutes');
const paymentRoutes = require('./server/routes/paymentRoutes');
const reservationRoutes = require('./server/routes/reservationRoutes');
const settingsRoutes = require('./server/routes/settingsRoutes');
const userRoutes = require('./server/routes/userRoutes');
const dealRoutes = require('./server/routes/dealRoutes');
const tarifRoutes = require('./server/routes/tarifRoutes');
const maintenaceRoutes = require('./server/routes/maitenanceRoutes');
const dashRoutes = require('./server/routes/dashRoutes');
const passwordRoutes = require('./server/routes/passwordRoutes');
const branchRoutes = require('./server/routes/branchRoutes');
const guestRoutes = require('./server/routes/guestRoutes');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

mongoose.connect(config.db.connectionString)  
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


// Utilisation des routes
app.use('/branch', branchRoutes);
app.use('/dash', dashRoutes);
app.use('/password', passwordRoutes);
app.use('/auth', authRoutes); 
app.use('/rooms', roomRoutes);
app.use('/feed_backs', feedBackRoutes);
app.use('/floor', floorRoutes);
app.use('/payment', paymentRoutes);
app.use('/reservation', reservationRoutes);
app.use('/settings', settingsRoutes);
app.use('/user', userRoutes);
app.use('/deal', dealRoutes);
app.use('/tarif', tarifRoutes);
app.use('/maintenance', maintenaceRoutes);
app.use('/guest', guestRoutes);

app.use(cors({
  exposedHeaders: ['Authorization']
}));

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


app.listen(port, () => {
  console.log(`Server is running at  : http://localhost:${port}`);
});