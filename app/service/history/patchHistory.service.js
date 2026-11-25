import { appendHistory, trimHistory } from "../../models/history.model.js";

import { ObjectIdSchema } from "../../schema/z.js";
import { HistoryEntryZSchema } from "../../schema/historyEntry.schema.js";
import { AppError } from "../../schema/AppError.js";

export async function appendHistoryService(historyId, patch) {
    const parsedId = ObjectIdSchema.safeParse(historyId);

    if (!parsedId.success) {
        throw new AppError("Invalid history ID.")
    };

    const parsed = HistoryEntryZSchema.parse(patch);

    return appendHistory(parsedId.data, parsed)
        .then((history) => {
            if (!history) throw new AppError("404: Not found", 404, null);

            return history;
        });
};


export async function trimHistoryService(historyId, patch) {
    const parsedId = ObjectIdSchema.safeParse(historyId);

    if (!parsedId.success) {
        throw new AppError("Invalid history ID.");
    };

    if (isNaN(patch)) throw new AppError("Invalid trim length.", 400, null)
    const count = Number(patch);

    if (count < 1 || count > 100) throw new AppError("Invalid trim length.", 400, null);

    return trimHistory(historyId, count)
        .then((history) => {
            if (!history) throw new AppError("404: Not found", 404, null);

            return history;
        });
};