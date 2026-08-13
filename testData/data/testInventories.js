import { ObjectId } from "mongodb";

import { inventoryIds } from "./ids";
import { userIds } from "./ids";

export const testInventories = [
    {
        _id: inventoryIds['test_inv_1'],
        name: "Test Inventory 1",
        description: "This is a test inventory.",
        author: userIds['yoda'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69a"),
        comments: [new ObjectId("6a7b7523f90647a55640dcc7"), new ObjectId("6a7b7523f90647a55640dcc8"), new ObjectId("6a7b7523f90647a55640dcc9"), new ObjectId("6a7b7523f90647a55640dcca"), new ObjectId("6a7b7523f90647a55640dccb")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_2'],
        name: "Test Inventory 2",
        description: "This is a test inventory.",
        author: userIds['yoda'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69b"),
        comments: [new ObjectId("6a7b7523f90647a55640dccc"), new ObjectId("6a7b7523f90647a55640dccd")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_3'],
        name: "Test Inventory 3",
        author: userIds['darth_vader'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69c"),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_4'],
        name: "Test Inventory 4",
        author: userIds['obi_wan'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69d"),
        comments: [new ObjectId("6a7b7523f90647a55640dcce")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_5'],
        name: "Test Inventory 5",
        author: userIds['anakin'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69e"),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_6'],
        name: "Test Inventory 6",
        author: userIds['palpatine'],
        history: new ObjectId("6a7d21d34bbcae225dd3f69f"),
        comments: [new ObjectId("6a7b7523f90647a55640dccf")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_7'],
        name: "Test Inventory 7",
        author: userIds['palpatine'],
        history: new ObjectId("6a7d21d34bbcae225dd3f6a0"),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: inventoryIds['test_inv_8'],
        name: "Test Inventory 8",
        author: userIds['obi_wan'],
        history: new ObjectId("6a7d21d34bbcae225dd3f6a1"),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];