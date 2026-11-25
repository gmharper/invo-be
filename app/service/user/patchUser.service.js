// MODELS
import { patchUser } from "../../models/index.js";

// SCHEMA
import { UserZSchema } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function patchUserService(userId, user) {
    const parsedId = ObjectIdSchema.safeParse(userId);
    
    if (!parsedId.success) {
        throw new AppError("Invalid user ID.", 400, parsedId.error.format());
    };

    const parsed = UserZSchema.parse(user);

    const blacklist = [
        "_id", "username", "passwordHash", "preferences", 
        "inventories", "items", "machines", "workflows",
        "history", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchUser(parsedId.data, parsed)
        .then((user) => {
            if (!user) throw new AppError("404: Not found", 404, null);
            
            return user;
        })
};