import { dispatchCommand } from "../models/sync.model.js";

export async function postSyncController(req, res, next) {
    const { commands, clientVersion, sessionId } = req.body;

    if (!Array.isArray(commands)) {
        return res.status(400).json({ error: "Commands must be an array." });
    };

    for (const command of commands) {
        await dispatchCommand(command);
    };

    return res.status(200).json({ ok: true });
};