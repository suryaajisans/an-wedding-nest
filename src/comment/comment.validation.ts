import { z, ZodType } from "zod";

export class CommentValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        comment: z.string().min(1)
    })
}