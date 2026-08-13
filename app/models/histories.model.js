import { History } from "../schema/historyEntry.schema.js";

export async function getHistory(id, useRef=false) {
    let history;

    if (useRef) {
        history = await History.findOne({ refId:id })
            .lean();
    } else {
        history = await History.findOne({ _id:id })
            .lean();
    };

    return history;
};


export async function appendHistory(historyId, entry) {
    const history = await History.findOneAndUpdate(
        { _id:historyId }, 
        { $push:{ entries:entry } }, 
        { new:true }
    );

    return history;
};

export async function trimHistory(historyId, count) {
  const history = await History.findOne({ _id:historyId });
  if (!history) throw new Error("History not found");

  const newLength = Math.max(history.entries.length - count, 0);

  return History.findOneAndUpdate(
    { _id:historyId },
    { $push: { entries: { $each: [], $slice: newLength } } },
    { returnDocument:'after' }
  );
};