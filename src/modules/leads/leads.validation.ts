import { z } from "zod";

export const createLeadSchema = z.object({
  buyerName: z.string().min(1, "Buyer name is required"),
  phone: z.string().min(10, "Phone is required"),
  email: z.string().email("Valid email is required"),
  propertyId: z.number().int().positive("Property ID must be valid"),
  priority: z.enum(["Hot", "Warm", "Cold"]),
  notes: z.string().optional(),
});

export const updateLeadSchema = z
  .object({
    priority: z.enum(["Hot", "Warm", "Cold"]).optional(),
    notes: z.string().optional(),
  })
  .refine((data) => data.priority !== undefined || data.notes !== undefined, {
    message: "At least one field (priority or notes) must be provided",
  });

export const transitionLeadSchema = z.object({
  status: z.enum(["New", "Contacted", "Visited", "Booked", "Lost"]),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type TransitionLeadInput = z.infer<typeof transitionLeadSchema>;
