import { ObjectId } from "mongodb";
import { machineIds, userIds } from "./ids";

export const testMachines = [
    {
        _id: machineIds['test_machine_1'],
        name: "Test Machine 1",
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_2'],
        name: "Test Machine 2",
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcd8")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_3'],
        name: "Test Machine 3",
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_4'],
        name: "Test Machine 4",
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcd9")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_5'],
        name: "Test Machine 5",
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcda"), new ObjectId("6a7b7523f90647a55640dcdb"), new ObjectId("6a7b765d87af109be29ebc5a")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_6'],
        name: "Test Machine 6",
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcdd")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_7'],
        name: "Test Machine 7",
        author: userIds['gmharper'],
        comments: [new ObjectId("6a7b7523f90647a55640dcde")],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: machineIds['test_machine_8'],
        name: "Test Machine 8",
        author: userIds['gmharper'],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];