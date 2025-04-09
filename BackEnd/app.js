const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config.js');



// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = config.port || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logger les requêtes HTTP

// Vérifier si l'URI MongoDB est bien définie
if (!config.mongodb) {
  console.error("❌ ERREUR : La variable MONGODB_URI n'est pas définie dans le fichier .env !");
  process.exit(1);
}

// Connexion à MongoDB (SANS options obsolètes)
mongoose.connect(config.mongodb)
  .then(() => {
    console.log(" Connecté à MongoDB");
    // Démarrer le serveur uniquement après la connexion réussie
    app.listen(port, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de connexion à MongoDB :", err);
    process.exit(1);
  });

// Importation des routes
const authRoutes = require("./server/routes/authRoutes");
const roomRoutes = require('./server/routes/roomRoutes');
const feedBackRoutes = require('./server/routes/feed_backRoutes');
const floorRoutes = require('./server/routes/floorRoutes');
const guestRoutes = require('./server/routes/guestRoutes');
const occupationRoutes = require('./server/routes/occupationRoutes');
const paymentRoutes = require('./server/routes/paymentRoutes');
const reservationRoutes = require('./server/routes/reservationRoutes');
const settingsRoutes = require('./server/routes/settingsRoutes');
const userRoutes = require('./server/routes/userRoutes');
const dealRoutes = require('./server/routes/dealRoutes');
const cleaningRoutes = require('./server/routes/cleaningRoutes');

// Utilisation des routes
app.use("/auth", authRoutes);
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

// Route de test pour vérifier si le serveur fonctionne
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend du projet hôtelier fonctionne correctement !" });
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route non trouvée" });
});