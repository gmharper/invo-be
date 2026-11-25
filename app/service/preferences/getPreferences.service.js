// MODELS
import { getUserPreferences } from "../../models/userPreferences.model.js";

// SCHEMA
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getUserPreferencesByRef(refId) {
    getUserPreferencesService(refId);
};

export async function getUserPreferencesService(id) {
    const parsedId = ObjectIdSchema.safeParse(id);

    if (!parsedId.success) {
        throw new AppError("Invalid preferences ID", 400, parsedId.error.format());
    };

    return getUserPreferences(parsedId.data, false)
        .then((preferences) => {
            if (!preferences) throw new AppError("404: Not found", 404, null);
            
            return preferences;
        });
};