import { z } from "zod";

export const loginUserDataValidationSchema = z.object({
    email: z.string().email("must be an email"),
    password: z.string().min(8, "min length is 8")
});
export const registerUserDataValidationSchema = z.object({
  mobileNumber: z.string().trim().refine((val) => {
    return /^\+?[0-9]{7,15}$/.test(val);
  }, {
    message: 'Invalid phone number format',
  }),
  fullName: z.string().min(3, "must be above 3").max(20, "must be below 20"),
  username: z.string().min(3, "must be above 3").max(20, "must be below 20"),
  password: z.string().min(8, "must be above 8"),
});
