const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feed_backControl');

const validate = require("../middlewares/validation.middleware");

const {createSchema, emailAndRoomSchema} = require('../validation/feedBackValidation');
const userSchema = require('../validation/userValidation');


// Récupérer tous les feedbacks qui existent
router.get('/', feedbackController.getAllFeed_backs);

/** Récupérer un feedback par email du guest et le numero de la chambre 
  et tu fais comme ça 
  example: je veux avoir le feedBack du guest guest@gmail.com qui a reserve la chambre 106
        /feed_backs/guest guest@gmail.com/106
*/
router.get('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.getFeed_backByEmailAndRoomNumber);


/** Récupérer les feedbacks par email du guest c'est tout 
  et tu fais comme ça 
  example: je veux avoir tout les feedBacks du guest guest@gmail.com 
        /feed_backs/guest guest@gmail.com
*/
router.get('/find/by/email/:email', validate(userSchema.emailSchema, 'params'), feedbackController.getFeed_backByEmail);


/**Recuperer tout les feedsback d'un moi precis mais la syntax du mois est :
 * 
 * 
*/
router.get('/month', feedbackController.getFeed_backCurrentMonth);



/**creer un feed_back avec le body suivant :
    comment, date, email, roomNumber
* et pour creer un feedBack tu fais appeler le router suivant :
      /feed_backs avec la methode post
 */
router.post('/',validate(createSchema), feedbackController.creatFeed_back);



/**pour supprimer un feedBack tu le supprime avec l'email du guest et le numero de la chambre
 * tu fais appeller le route suivant :
      /feed_backs/sonEmailComplet/NumeroDeLaChambre
 *  tu le fais avec la methode delete
 */
router.delete('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.suppFeed_back);

module.exports = router;