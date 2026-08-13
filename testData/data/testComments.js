import { ObjectId } from "mongodb";
import { commentIds, userIds } from "./ids";

export const testComments = [
    {
        _id: commentIds['inventory1_comment1'],
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "inventory1 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory1_comment2'],
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "inventory1 comment2",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory1_comment3'],
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "inventory1 comment3",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory1_comment4'],
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "inventory1 comment4",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: commentIds['inventory1_comment5'],
        refId: new ObjectId("6a7511150930fd3868490c99"),
        type: "inventory",
        body: "inventory1 comment5",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: commentIds['inventory2_comment1'],
        refId: new ObjectId("6a7511150930fd3868490c9a"),
        type: "inventory",
        body: "inventory2 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory2_comment2'],
        refId: new ObjectId("6a7511150930fd3868490c9a"),
        type: "inventory",
        body: "inventory2 comment2",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory4_comment1'],
        refId: new ObjectId("6a7511150930fd3868490c9c"),
        type: "inventory",
        body: "inventory4 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['inventory6_comment1'],
        refId: new ObjectId("6a7511150930fd3868490c9e"),
        type: "inventory",
        body: "inventory6 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item1_comment1'],
        refId: new ObjectId("6a75f0845a9a13e26ba49314"),
        type: "item",
        body: "item1 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item1_comment2'],
        refId: new ObjectId("6a75f0845a9a13e26ba49314"),
        type: "item",
        body: "item1 comment2",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item1_comment3'],
        refId: new ObjectId("6a75f0845a9a13e26ba49314"),
        type: "item",
        body: "item1 comment3",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item3_comment1'],
        refId: new ObjectId("6a75f0845a9a13e26ba49316"),
        type: "item",
        body: "item3 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item8_comment1'],
        refId: new ObjectId("6a75f0845a9a13e26ba4931b"),
        type: "item",
        body: "item8 comment1",
        replies: [],
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item8_comment2'],
        refId: new ObjectId("6a75f0845a9a13e26ba4931b"),
        type: "item",
        body: "item8 comment2",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item8_comment3'],
        refId: new ObjectId("6a75f0845a9a13e26ba4931b"),
        type: "item",
        body: "item8 comment3",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['item8_comment4'],
        refId: new ObjectId("6a75f0845a9a13e26ba4931b"),
        type: "item",
        body: "item8 comment4",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine2_comment1'],
        refId: new ObjectId("6a75fc21d8295be39ee90432"),
        type: "machine",
        body: "machine2 comment1",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine4_comment1'],
        refId: new ObjectId("6a75fc21d8295be39ee90434"),
        type: "machine",
        body: "machine4 comment1",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine5_comment1'],
        refId: new ObjectId("6a75fc21d8295be39ee90435"),
        type: "machine",
        body: "machine5 comment1",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine5_comment2'],
        refId: new ObjectId("6a75fc21d8295be39ee90435"),
        type: "machine",
        body: "machine5 comment2",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: commentIds['machine5_comment3'],
        refId: new ObjectId("6a7b765d87af109be29ebc5a"),
        type: "machine",
        body: "machine5 comment3",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine6_comment1'],
        refId: new ObjectId("6a75fc21d8295be39ee90436"),
        type: "machine",
        body: "machine6 comment1",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: commentIds['machine7_comment1'],
        refId: new ObjectId("6a75fc21d8295be39ee90437"),
        type: "machine",
        body: "machine7 comment1",
        replies: [],
        author: userIds['darth_maul'],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];