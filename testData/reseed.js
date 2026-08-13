import connectDB from "../db/connection.js";

import { testUsers } from "./data/testUsers.js";
import { testInventories } from "./data/testInventories.js";
import { testItems } from "./data/testItems.js";
import { testMachines } from "./data/testMachines.js";
import { testWorkflows } from "./data/testWorkflows.js";
import { testComments } from "./data/testComments.js";
import { testHistories } from "./data/testHistories.js";
import { testUserPreferences } from "./data/testUserPreferences.js";
import { testDashboardTabs } from "./data/testDashboardTabs.js";

export async function deleteData (type) {
    if (![
        "users", "inventories", "items", "machines", "workflows", "nodegroups", 
        "comments", "histories", "userPreferences", "dashboardTabs"
    ].includes(type)) return;

    const db = await connectDB();
    await db.collection(type).deleteMany({});
};

export async function seedData(type="inventories", data) {
    if (![
        "users", "inventories", "items", "machines", "workflows", "nodegroups", 
        "comments", "histories", "userPreferences", "dashboardTabs"
    ].includes(type)) return;

    const db = await connectDB();

    try { 
        const result = await db.collection(type).insertMany([...data])
    } catch (err) {
        console.log(err);
    };
};


export async function reseed() {
    await deleteData("users");
    await deleteData("inventories");
    await deleteData("items");
    await deleteData("machines");
    await deleteData("workflows");
    await deleteData("comments");
    await deleteData("histories");
    await deleteData("userPreferences");
    await deleteData("dashboardTabs");
    
    await seedData("users", testUsers);
    await seedData("inventories", testInventories);
    await seedData("items", testItems);
    await seedData("machines", testMachines);
    await seedData("workflows", testWorkflows);
    await seedData("comments", testComments);
    await seedData("histories", testHistories);
    await seedData("userPreferences", testUserPreferences);
    await seedData("dashboardTabs", testDashboardTabs);
};
