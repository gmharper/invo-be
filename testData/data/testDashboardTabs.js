import { ObjectId } from "mongodb";
import { dashboardTabIds, userIds } from "./ids";

export const testDashboardTabs = [
    {
        _id: dashboardTabIds['dashboardtab1'],
        name: "Dashboard Tab 1",
        panels: [],
        author: new ObjectId("6a75f003ada1ee425aa74af9"),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: dashboardTabIds['dashboardtab2'],
        name: "Dashboard Tab 2",
        panels: [],
        author: new ObjectId("6a75f003ada1ee425aa74af9"),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: dashboardTabIds['dashboardtab3'],
        name: "Dashboard Tab 3",
        panels: [],
        author: new ObjectId("6a75f003ada1ee425aa74af9"),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];