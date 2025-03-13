const express = require("express");
const router = express.Router();
const Branch = require("../models/Branch");

// ➤ 1. Ajouter une nouvelle branche
router.post("/", async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 2. Récupérer toutes les branches
router.get("/", async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 3. Modifier une branche
router.put("/:id", async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ 4. Supprimer une branche
router.delete("/:id", async (req, res) => {
    try {
        await Branch.findByIdAndDelete(req.params.id);
        res.json({ message: "Branche supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
