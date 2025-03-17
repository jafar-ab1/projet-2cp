const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yzamri:<G7umXh5TRGrTGYfD>@cluster0.14egf.mongodb.net/')

  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/auth', require('./server/routes/authRoutes'));
app.use('/rooms', require('./server/routes/roomRoutes'));
app.use('/feed_backs', require('./server/routes/feed_backRoutes'));
app.use('/floor', require('./server/routes/floorRoutes'));
app.use('/guest', require('./server/routes/guestRoutes'));
app.use('/occupation', require('./server/routes/occupationRoutes'));
app.use('/payment', require('./server/routes/paymentRoutes'));
app.use('/reservation', require('./server/routes/reservationRoutes'));
app.use('/settings', require('./server/routes/settingsRoutes'));
app.use('/user', require('./server/routes/userRoutes'));
app.use('/deal', require('./server/routes/dealRoutes'));
app.use('/cleaning', require('./server/routes/cleaningRoutes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(port, ()=> {
  console.log(`Server running at http://localhost:${port}`);
});