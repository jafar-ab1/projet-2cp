const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');
const guestControll = require('../controllers/guestControl.js');
const guestValidation = require('../validation/guestValidation.js');



/** cette fonction elle renvoie l'utilisateur qui a deja fais un reservation 
 donc son status etait due in et elle fais son check in donc status de la reservation deviens check in 
 et la chambre son status deviens occupied 
 et elle lui envois un email pour lui dire qu'il a fais son cheked in dans l'hotel
 */
router.post('/addGuest',validate(guestValidation.addGuest), guestControll.AddGuest);

router.get('/', guestControll.getAll);

router.get('/checkIn/dueOut', guestControll.getAllCheckInDueOut);

router.put('/update/:email', guestControll.updateGuest);

router.delete('/delete/:email', guestControll.deleteGuest);


module.exports = router;



