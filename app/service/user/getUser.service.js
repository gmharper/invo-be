// MODELS
import { getUsers, getUser } from "../../models/index.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getUsersService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'username', 'name', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getUsers({ ...parsed.data })
        .then((data) => {
            if (!data || !data.users) throw new AppError("404: Not found", 404, null);

            return data;
        });
};


export async function getUserService(userId) {
    const parsedId = ObjectIdSchema.safeParse(userId);

    if (!parsedId.success) {
        throw new AppError("Invalid user ID.", 400, parsedId.error.format());
    };

    return getUser(parsedId.data)
        .then((user) => {
            if (!user) throw new AppError("404: Not found", 404, null);
            
            return user;
        });
};