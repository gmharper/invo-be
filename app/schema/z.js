import { z } from "zod";

export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);
export const UnixSchema = z.number().int().positive().min(1_000_000_000).max(9_999_999_999_999);
export const ISOSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/);