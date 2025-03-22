import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Importation des routes
import roomRoutes from './server/routes/roomRoutes.js';
import feedBackRoutes from './server/routes/feed_backRoutes.js';
import floorRoutes from './server/routes/floorRoutes.js';
import guestRoutes from './server/routes/guestRoutes.js';
import occupationRoutes from './server/routes/occupationRoutes.js';
import paymentRoutes from './server/routes/paymentRoutes.js';
import reservationRoutes from './server/routes/reservationRoutes.js';
import settingsRoutes from './server/routes/settingsRoutes.js';
import userRoutes from './server/routes/userRoutes.js';
import dealRoutes from './server/routes/dealRoutes.js';
import cleaningRoutes from './server/routes/cleaningRoutes.js';


const app = express();
const port = 3000;
dotenv.config();


app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yzamri:<G7umXh5TRGrTGYfD>@cluster0.14egf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})  
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Utilisation des routes
app.use('/rooms', roomRoutes);
app.use('/feed_backs', feedBackRoutes);
app.use('/floor', floorRoutes);
app.use('/guest', guestRoutes);
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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});