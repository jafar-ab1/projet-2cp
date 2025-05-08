const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware.js');

const dashConrtoll = require('../controllers/dashController');

const floorValidation = require('../validation/floorValidation');
const roomScehma = require('../validation/roomValidation');

//à revoir
router.get('/status/:status', validate(floorValidation.statusSchema, 'params'), dashConrtoll.countFloorStatus);


/**pour compter tout les check-ins d'aujourd'hui dans tout l'hotel */
router.get('/today/in', dashConrtoll.getCheck_in);


/**pour compter tout les chech-outs d'aujourd'hui dans tout l'hotel */
router.get('/today/out', dashConrtoll.getCheck_out);


router.get('/inHotel', dashConrtoll.inHotel);


/** pour compter tout les chambres dans l'hotel mais avec le parametre status1 qui est 
 * soit Available ou Occupied
 * tu fais rentrer ton status pour le compter 
 * example : pour compter tout les chambres available dans l'hotel tu fais:
 *         /dash/countStatus/Available
 * et pouor Occupied:
 *         /dash/countStatus/Occupied
 */
router.get('/countStatus/:status1', validate(roomScehma.roomStatus1Schema, 'params'), dashConrtoll.countRoomsByStatus1); //Available, Occupied


/**pour compter les chambres avec status 0 qui: (Maked-up) ou (Not Maked-up)
 en fonction de status1 qui : Available ou Occupied
 *example :
 *je veux compter tout les chambre Maked-up mais Available je fais: 
            /Dash/count/Maked-up/Available
 *je veux compter tout les chambre Maked-up mais Occupied je fais: 
            /Dash/count/Maked-up/Occupied
 */
router.get('/count/:status0/:status1', validate(roomScehma.roomStatus0AndStatus1CountSchema, 'params'), dashConrtoll.countRoomsByStatus0AndStatus1);



/**pour compter les chambres avec son type qui est : Standard', Deluxe, Suite mais elles sont Available
 * par example: je veux compter les chambres Deluxe qui sont Available je fais:
        /dash/countTypeAvailable/Deluxe
 */
router.get('/countTypeAvailable/:type', validate(roomScehma.roomTypeCountSchema, 'params'), dashConrtoll.countRoomsByTypeAndAvailable);



/** pour compter tout les chambres de l'hotel avec son type qui est : Standard', Deluxe, Suite
 * par example: je veux compter les chambres Deluxe qui sont Available je fais:
        /dash/count/All/type/Deluxe
*/
router.get('/count/All/type/:type', validate(roomScehma.roomTypeSchema, 'params'), dashConrtoll.countByType);




module.exports = router;