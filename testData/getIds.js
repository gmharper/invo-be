import { ObjectId } from "mongodb";

function generateIds(count) {
    const ids = Array.from({ length:count }).map((value) => {
        const id = new ObjectId();

        return id;
    });

    return ids;
};

console.log(generateIds(3));