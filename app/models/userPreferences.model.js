import { UserPreferences } from "../schema/userPreferences.schema.js";

export async function getUserPreferences(id, useRef=false) {
    let preferences;

    if (useRef) {
        preferences = await UserPreferences.findOne({ refId:id })
            .lean()
    } else {
        preferences = await UserPreferences.findOne({ _id:id })
            .lean()
    };

    return preferences;
};

export async function patchUserPreferences(id, patch) {
    const preferences = await UserPreferences.findOneAndUpdate(
        { _id:id }, 
        { $set:patch }, 
        { returnDocument:'after' }
    );

    return preferences;
};