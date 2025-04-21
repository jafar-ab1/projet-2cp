const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reserveControl');
const validate = require('../middlewares/validation.middleware');
const { emailSchema, 
  createSchema,
  updateSchema,
  emailAndRoomNumberSchema
  } = require('../validation/reservationValidation');



  const convertRoomNumberToArray = (req, res, next) => {
    if (req.params.roomNumber) {
      // Rendre roomNumber compatible avec le schéma de validation
      req.params.roomNumber = [parseInt(req.params.roomNumber)];
    }
    next();
  };
  

router.get('/', reservationController.getAllReservations);


router.get('/:email',validate(emailSchema, 'params'), reservationController.getReservationByEmail);


router.get('/:email/:roomNumber',convertRoomNumberToArray, validate(emailAndRoomNumberSchema, 'params'), reservationController.getReservationByEmailAndRoomNumber);


router.post('/',validate(createSchema), reservationController.creatReservation);


router.put('/:email/:roomNumber',convertRoomNumberToArray, validate(emailAndRoomNumberSchema, 'params'), reservationController.modifyReservation);


router.delete('/:email/:roomNumber',convertRoomNumberToArray, validate(emailAndRoomNumberSchema, 'params'), reservationController.suppReservation);

module.exports = router;