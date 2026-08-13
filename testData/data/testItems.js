import { ObjectId } from "mongodb";
import { generateRandomItems } from "./getRandomItem";

import { userIds } from "./ids";
import { itemIds } from "./ids";

const defaultItems = [
    {
        _id: itemIds['test_item_1'],
        name: 'Test Item 1',
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcd0"), new ObjectId("6a7b7523f90647a55640dcd1"), new ObjectId("6a7b7523f90647a55640dcd2")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_2'],
        name: 'Test Item 2',
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_3'],
        name: 'Test Item 3',
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcd3")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_4'],
        name: 'Test Item 4',
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_5'],
        name: 'Test Item 5',
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_6'],
        name: 'Test Item 6',
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_7'],
        name: 'Test Item 7',
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: itemIds['test_item_8'],
        name: 'Test Item 8',
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcd4"), new ObjectId("6a7b7523f90647a55640dcd5"), new ObjectId("6a7b7523f90647a55640dcd6"), new ObjectId("6a7b7523f90647a55640dcd7")],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export const testItems = defaultItems.concat(generateRandomItems(100));