// MODELS
import { getHistory, appendHistory, trimHistory } from "../models/histories.model.js";

// SCHEMA
import { HistoryEntryZSchema } from "../schema/historyEntry.schema.js";
import { ObjectIdSchema } from "../schema/z.js";

export async function getHistoryByRef(req, res, next) {
    const { refId } = req.params;

    req.params.historyId = refId;

    getHistoryController(req, res, next, true);
};


export async function getHistoryController(req, res, next, useRef=false) {
    const { historyId } = req.params;

    const parsedId = ObjectIdSchema.safeParse(historyId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid comment ID",
            issues: parsedId.error.issues
        });
    };
    
    const id = parsedId.data;

    return getHistory(id, useRef)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ history });
        })
        .catch((err) => { next(err) })
};


export async function patchHistoryController(req, res, next) {
    const { historyId } = req.params;

    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(historyId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid history ID",
            issues: parsedId.error.issues
        })
    };

    if (!isNaN(data)) trimHistoryController(req, res, next)
    else appendHistoryController(req, res, next);
};


export async function appendHistoryController(req, res, next) {
    const { historyId } = req.params;
    const data = req.body;

    const parsed = HistoryEntryZSchema.safeParse(data);
    if (!parsed.success) {
        return res.status(400).send({
            error: parsed.error.issues
        })
    };

    return appendHistory(historyId, parsed.data)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ 
                msg: "History successfully appended!",
                history
            });
        })
        .catch((err) => { next(err) });
};


export async function trimHistoryController(req, res, next) {
    const { historyId } = req.params;
    const data = req.body;
    
    if (isNaN(data)) return res.status(400).send({ msg: "Invalid trim length" });
    const count = Number(data)

    if (count < 1 || count > 100) return res.status(400).send({ msg: "Invalid trim length" });

    return trimHistory(historyId, count)
        .then((history) => {
            if (!history) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({
                msg: "History successfully trimmed",
                count: data,
                history
            });
        });
};