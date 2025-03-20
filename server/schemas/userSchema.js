import joi from 'joi';

export const createUserSchema = joi.object({
    username: joi.string().min(5).required().messages({
      "string.empty": "Le nom d'utilisateur est requis",
      "string.min": "Le nom d'utilisateur doit contenir au moins 5 caractères",
      "any.required": "Le nom d'utilisateur est requis",
    }),
  
    email: joi.string().email().required().messages({
      "string.empty": "L'email est requis",
      "string.email": "Format d'email invalide",
      "any.required": "L'email est requis",
    }),
  
    password: joi.string().min(6).required().messages({
      "string.empty": "Le mot de passe est requis",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
      "any.required": "Le mot de passe est requis",
    }),
  });

export const updateUserSchema = joi.object({
    username: joi.string().min(5).optional().messages({
      "string.min": "Le nom d'utilisateur doit contenir au moins 5 caractères",
    }),
  
    email: joi.string().email().optional().messages({
      "string.email": "Format d'email invalide",
    }),
  
    password: joi.string().min(6).optional().messages({
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    }),
  });

export const userIdSchema = joi.object({
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.empty": "L'ID est requis",
        "string.pattern.base": "ID MongoDB invalide",
        "any.required": "L'ID est requis",
      }),
  })

