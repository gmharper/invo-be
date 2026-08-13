import { ObjectId } from "mongodb";
import { inventoryIds, historyIds } from "./ids";

export const testHistories = [
    {
        _id: historyIds['inventory1_history'],
        refId: inventoryIds['test_inv_1'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"THING_DONE", body:"", previous:"", new:"", timestamp:new Date() },
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory2_history'],
        refId: inventoryIds['test_inv_2'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory3_history'],
        refId: inventoryIds['test_inv_3'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory4_history'],
        refId: inventoryIds['test_inv_4'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory5_history'],
        refId: inventoryIds['test_inv_5'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory6_history'],
        refId: inventoryIds['test_inv_6'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory7_history'],
        refId: inventoryIds['test_inv_7'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: historyIds['inventory8_history'],
        refId: inventoryIds['test_inv_8'],
        type: 'inventory',
        entries: [
            { author:new ObjectId("6a75f003ada1ee425aa74af9"), action:"INVENTORY_CREATED", body:"", timestamp:new Date() }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];