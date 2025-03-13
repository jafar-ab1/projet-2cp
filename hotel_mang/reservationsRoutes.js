const express = require("express");
const router = express.Router();
const { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation } = require("../controllers/reservationController");

// Routes CRUD pour les réservations
router.get("/", getAllReservations);        // Obtenir toutes les réservations
router.get("/:id", getReservationById);     // Obtenir une réservation par ID
router.post("/", createReservation);        // Créer une nouvelle réservation
router.put("/:id", updateReservation);      // Mettre à jour une réservation
router.delete("/:id", deleteReservation);   // Supprimer une réservation

module.exports = router;
