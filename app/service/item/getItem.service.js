// MODELS
import { getItems, getItem } from "../../models/item.model.js";

// SCHEMA
import { queryValidationSchema } from "../../schema/queryValidation.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getItemsService(query) {
    const parsed = queryValidationSchema.safeParse(query);

    if (!parsed.success) {
        throw new AppError("Invalid query.", 400, parsed.error.format());
    };

    const validSorts = ['_id', 'name', 'author', 'createdAt', 'updatedAt'];
    if (!validSorts.includes(parsed.data.sort)) {
        throw new AppError("Invalid sort query.", 400, null);
    };

    return getItems({ ...parsed.data })
        .then((data) => {
            if (!data || !data.items) throw new AppError("404: Not found", 404, null);
            
            return data;
        });
};

export async function getItemService(itemId) {
    const parsedId = ObjectIdSchema.safeParse(itemId);
    if (!parsedId.success) {
        throw new AppError("Invalid item ID.", 400, parsedId.error.format());
    };

    return getItem(parsedId.data)
        .then((item) => {
            if (!item) throw new AppError("404: Not found", 404, null);

            return item;
        });
};