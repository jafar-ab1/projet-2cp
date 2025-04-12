function validate(schema, source = 'body') {
    return (req, res, next) => {
        // Choix de la source de données à valider
        const dataToValidate = source === 'params' ? req.params : req.body;
        
        const { error } = schema.validate(dataToValidate, { 
            abortEarly: false,  // Retourne toutes les erreurs
            allowUnknown: false // Rejette les champs non définis dans le schéma
        });

        if (error) {
            return res.status(400).json({
                errors: error.details.map(detail => ({
                    path: detail.path[0],
                    message: detail.message.replace(/"/g, '') // Supprime les guillemets
                }))
            });
        }
        next();
    };
}

module.exports = validate;