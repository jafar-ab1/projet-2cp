const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// ➤ 1. Ajouter une nouvelle chambre
router.post("/", async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 2. Récupérer toutes les chambres
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find().populate("branch");
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 3. Modifier une chambre
router.put("/:id", async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 4. Supprimer une chambre
router.delete("/:id", async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Chambre supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
