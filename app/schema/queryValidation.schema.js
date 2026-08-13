import z from "zod";
import { ObjectIdSchema } from "./z.js";

export const queryValidationSchema = z.object({
    author: ObjectIdSchema.nullable().default(null),
    refId: ObjectIdSchema.nullable().default(null),
    sort: z.string().default("_id"),
    order: z.enum(['asc', 'desc', 'ascending', 'descending', "1", "-1"]).default('desc'),
    limit: z.coerce.number().int().positive().default(50),
    page: z.coerce.number().int().positive().default(1)
});