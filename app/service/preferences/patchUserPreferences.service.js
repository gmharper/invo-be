// MODELS
import { patchUserPreferences } from "../../models/userPreferences.model.js";

// SCHEMA
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

/////////////////////////
export async function patchUserPreferencesByRef(refId, patch) {
    patchUserPreferencesService(refId, patch);
};

export async function patchUserPreferencesService(id, patch) {
    const parsedId = ObjectIdSchema.safeParse(id);

    if (!parsedId.success) {
        throw new AppError("Invalid preferences ID", 400, parsedId.error.format());
    };

    const parsed = UserPreferencesZSchema.parse(patch);

    const blacklist = [
        "_id", "refId", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchUserPreferences(parsedId.data, parsed)
        .then((preferences) => {
            if (!preferences) throw new AppError("404: Not found", 404, null);
            
            return preferences;
        });
};