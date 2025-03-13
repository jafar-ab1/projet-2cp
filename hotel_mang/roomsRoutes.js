const express = require("express");
const router = express.Router();
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require("../controllers/roomController");

// Routes CRUD pour les chambres
router.get("/", getAllRooms);      // Obtenir toutes les chambres
router.get("/:id", getRoomById);   // Obtenir une chambre par ID
router.post("/", createRoom);      // Créer une nouvelle chambre
router.put("/:id", updateRoom);    // Mettre à jour une chambre
router.delete("/:id", deleteRoom); // Supprimer une chambre

module.exports = router;
