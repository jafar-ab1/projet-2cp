const express = require("express");
const router = express.Router();

// Route de test pour voir si tout fonctionne
router.get("/", (req, res) => {
    res.send("Payment routes are working!");
});

module.exports = router;
