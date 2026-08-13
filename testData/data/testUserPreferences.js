import { ObjectId } from "mongodb";

export const testUserPreferences = [
    {
        _id: new ObjectId("6a7de2fa748fef5224525d18"),
        refId: new ObjectId("6a75f003ada1ee425aa74af9"),
        theme: "dark",
        keepLoggedIn: true,
        sendEmailNotifications: true,
        showEmail: true,
        showPhone: true,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d19"),
        refId: new ObjectId("6a75eae8292c72785545b032"),
        theme: "dark",
        keepLoggedIn: false,
        sendEmailNotifications: true,
        showEmail: true,
        showPhone: true,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1a"),
        refId: new ObjectId("6a75eae8292c72785545b033"),
        theme: "dark",
        keepLoggedIn: false,
        sendEmailNotifications: false,
        showEmail: false,
        showPhone: false,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1b"),
        refId: new ObjectId("6a75eae8292c72785545b034"),
        theme: "dark",
        keepLoggedIn: true,
        sendEmailNotifications: false,
        showEmail: true,
        showPhone: false,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1c"),
        refId: new ObjectId("6a75eae8292c72785545b035"),
        theme: "dark",
        keepLoggedIn: false,
        sendEmailNotifications: true,
        showEmail: true,
        showPhone: false,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1d"),
        refId: new ObjectId("6a75eae8292c72785545b036"),
        theme: "light",
        keepLoggedIn: false,
        sendEmailNotifications: true,
        showEmail: false,
        showPhone: false,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1e"),
        refId: new ObjectId("6a75eae8292c72785545b037"),
        theme: "light",
        keepLoggedIn: true,
        sendEmailNotifications: false,
        showEmail: false,
        showPhone: true,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d1f"),
        refId: new ObjectId("6a75eae8292c72785545b038"),
        theme: "dark",
        keepLoggedIn: true,
        sendEmailNotifications: true,
        showEmail: false,
        showPhone: false,
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        _id: new ObjectId("6a7de2fa748fef5224525d20"),
        refId: new ObjectId("6a75eae8292c72785545b039"),
        theme: "light",
        keepLoggedIn: true,
        sendEmailNotifications: true,
        showEmail: true,
        showPhone: true,
        createdAt:new Date(),
        updatedAt:new Date()
    }
];