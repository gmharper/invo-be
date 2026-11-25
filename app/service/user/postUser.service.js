// MODELS
import { postUser } from "../../models/user.model.js";

// SCHEMA
import { UserPreferences, defaultUserPreferences } from "../../schema/userPreferences.schema.js";
import { History } from "../../schema/historyEntry.schema.js";
import { UserZSchema } from "../../schema/user.schema.js";
import { AppError } from "../../schema/AppError.js";
import { ObjectId } from "mongodb";

export async function postUserService(user) {
    const parsed = UserZSchema.safeParse(user);

    if (!parsed.success) {
        throw new AppError("Error parsing posted user.", 400, parsed.error.format());
    };

    const userPreferencesId = new ObjectId();
    const userHistoryId = new ObjectId();

    let createdUser = {
        ...parsed.data,
        preferences: userPreferencesId,
        history: userHistoryId
    };

    return postUser(createdUser)
        .then((data) => {
            if (!data) return;

            return UserPreferences.create({
                _id: userPreferencesId,
                refId: createdUser._id,
                ...defaultUserPreferences,
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt
            });
        })
        .then((preferences) => {
            if (!preferences) return;

            return History.create({
                _id: userHistoryId,
                refId: createdUser._id,
                type: "user",
                entries: [
                    { author:createdUser._id, action:"USER_CREATED", body:"", timestamp:createdUser.createdAt }
                ],
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt
            }).then(history => { 
                if (!history) return;

                return { preferences, history };
            });
        })
        .then((result) => {
            if (!result) return;

            const { preferences, history } = result;

            return { user:createdUser, preferences, history };
        });
};