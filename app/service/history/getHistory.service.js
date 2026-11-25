// MODELS
import { getHistory } from "../../models/history.model.js";

// SCHEMA
import { ObjectIdSchema } from "../../schema/z.js";
import { AppError } from "../../schema/AppError.js";

export async function getHistoryService(historyId) {
    const parsedId = ObjectIdSchema.safeParse(historyId);

    if (!parsedId.success) {
        throw new AppError("Invalid history ID.", 400, parsedId.error.format());
    };

    return getHistory(parsedId.data, false)
        .then((history) => {
            if (!history) throw new AppError("404: Not found", 404, null);
            
            return history;
        });
};