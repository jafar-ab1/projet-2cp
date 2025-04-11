function validate(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body);
        const { error } = validationResult;
        if(!error) return next();
        const { details } = error;
        return res.status(400).json({
            errors: details.map(detail => ({ path: detail.path[0], message: detail.message }))
        });
    }
}

module.exports= validate;