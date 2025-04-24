const express = require('express');
const router = express.Router();
const floorController= require ('../controllers/floorControl');
const validate = require('../middlewares/validation.middleware.js');
const {floorNumberSchema, createFloorSchema, updateFloorSchema, statusSchema} = require('../validation/floorValidation')

/**cette fonction c'est pour afficher les données de touts les etages du l'hotel
 tu le fais appeller avec le route suivant:
 /floor                  avec la methode get
 */
router.get('/', floorController.getAllFloors);



/**cette fonction c'est pour afficher les données d'un etage precis par son numero
 tu le fais appeller avec le route suivant: par ex le numero de l'etage est 106
 /floor/106              avec la methode get
 */
router.get('/:floorNumber',[validate(floorNumberSchema, 'params')], floorController.getFloorByFloorNb);



/**pour creer un etage dans l'hotel avec le body suivant : floorNumber, status sachant que status 
  d'un floor est [Complété ou À compléter]
  tu fais appeller cette fonction avec le route suivant 
  /floor        avec la methode post
 */
router.post('/',[validate(createFloorSchema)], floorController.createFloor);



/**cette fonction c'est pour changer les données d'un etage precis par son numero(n'importe quelle données)
 tu le fais appeller avec le route suivant: par ex le numero de l'etage est 106
 /floor/106              avec la methode put
 */
router.put('/:floorNumber', validate(updateFloorSchema),floorController.updateFloor);




/**cette fonction c'est pour supprimer un etage precis par son numero
 tu le fais appeller avec le route suivant: par ex le numero de l'etage est 106
 /floor/106              avec la methode delete
 */
router.delete('/:floorNumber',[validate(floorNumberSchema, 'params')], floorController.deleteFloor);

module.exports = router;