import { z } from 'zod';

export const registerUserDataValidationSchema = z.object({
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  
  email: z.string()
    .email("Please enter a valid email address"),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  
  mobileNumber: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be less than 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  
  role: z.enum(['client', 'admin'], {
    errorMap: () => ({ message: "Role must be either 'client' or 'admin'" })
  }).optional().default('client')
});

export const loginUserDataValidationSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address"),
  
  password: z.string()
    .min(1, "Password is required")
});


