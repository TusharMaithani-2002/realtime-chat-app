import { z } from "zod";

// this helps to validate user input

export const addFriendValidator = z.object({
  email: z.string().email(),
});
