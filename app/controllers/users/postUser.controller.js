import { postUser } from "../../models";
import { UserPreferences, defaultUserPreferences } from "../../schema/userPreferences.schema";
import { History } from "../../schema/historyEntry.schema";
import { UserZSchema } from "../../schema/user.schema";
import { ObjectId } from "mongodb";

export default async function postUserController(req, res, next) {
    const data = req.body;

    const parsed = UserZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Error parsing posted user",
            error: parsed.error.issues
        });
    };

    const userPreferencesId = new ObjectId();
    const userHistoryId = new ObjectId();
    parsed.data = {
        ...parsed.data,
        preferences: userPreferencesId,
        history: userHistoryId
    };
    let createdUser = { ...parsed.data };

    return postUser(parsed.data)
        .then((data) => {
            if (!data) return res.status(404).send({ err_msg: "404: Not Found" });

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
                else return { preferences, history };
            });
        })
        .then((result) => {
            if (!result) return;

            const { preferences, history } = result;

            return res.status(201).json({
                msg: "User created successfully!",
                user: createdUser,
                preferences, history
            });
        })
        .catch((err) => { next(err) });
};