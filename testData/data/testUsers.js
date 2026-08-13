import { ObjectId } from "mongodb";
import { userIds, userPreferencesIds, inventoryIds, itemIds } from "./ids";

export const testUsers = [
    {
        _id: userIds['gmharper'],
        username: 'gmharper',
        name: 'George',
        preferences: userPreferencesIds['gmharper'],
        dashboardTabs: [new ObjectId("6a7de95ba1251aebb264484c"), new ObjectId("6a7de95ba1251aebb264484d"), new ObjectId("6a7de95ba1251aebb264484e")],
        inventories: [],
        items: [...Object.values(itemIds)],
        machines: [],
        workflows: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['boba_fett'],
        username: 'bobafett',
        name: 'Boba Fett',
        preferences: userPreferencesIds['boba_fett'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['darth_maul'],
        username: 'darth_maul',
        name: 'Darth Maul',
        preferences: userPreferencesIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['darth_vader'],
        username: 'Vader',
        name: 'Darth Vader',
        preferences: userPreferencesIds['darth_vader'],
        inventories: [inventoryIds['test_inv_3']],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['jar_jar'],
        username: 'jarjarOfficial',
        name: 'Jar-Jar Binks',
        preferences: userPreferencesIds['jar_jar'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['yoda'],
        username: 'y0da',
        name: 'Yoda',
        preferences: userPreferencesIds['yoda'],
        inventories: [inventoryIds['test_inv_1'], inventoryIds['test_inv_2']],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['obi_wan'],
        username: 'obiwan',
        name: 'Obi-wan Kenobi',
        preferences: userPreferencesIds['obi_wan'],
        inventories: [inventoryIds['test_inv_4'], inventoryIds['test_inv_8']],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['palpatine'],
        username: 'palps',
        name: 'Emperor Palpatine',
        preferences: userPreferencesIds['palpatine'],
        inventories: [inventoryIds['test_inv_6'], inventoryIds['test_inv_7']],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: userIds['anakin'],
        username: 'anakinS',
        name: 'Anakin Skywalker',
        preferences: userPreferencesIds['anakin'],
        inventories: [inventoryIds['test_inv_5']],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];