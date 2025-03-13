const express = require("express");
const router = express.Router();

// Exemple de route utilisateur
router.get("/", (req, res) => {
  res.json({ message: "Liste des utilisateurs" });
});

module.exports = router;
