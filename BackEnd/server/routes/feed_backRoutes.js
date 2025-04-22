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
        /feed_back/guest guest@gmail.com/106
*/
router.get('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.getFeed_backByEmailAndRoomNumber);


/** Récupérer les feedbacks par email du guest c'est tout 
  et tu fais comme ça 
  example: je veux avoir tout les feedBacks du guest guest@gmail.com 
        /feed_back/guest guest@gmail.com
*/
router.get('/find/by/email/:email', validate(userSchema.emailSchema, 'params'), feedbackController.getFeed_backByEmail);



router.get('/month', feedbackController.getFeed_backCurrentMonth);

// Ajouter un nouveau feedback
router.post('/',validate(createSchema), feedbackController.creatFeed_back);

// Supprimer un feedback
router.delete('/:email/:roomNumber',validate(emailAndRoomSchema, 'params'), feedbackController.suppFeed_back);

module.exports = router;