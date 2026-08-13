import { ObjectId } from "mongodb";

import { userIds } from "./ids";

// Random helpers
const randomHexColor = () =>
  "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");

const randomWord = () =>
  Math.random().toString(36).substring(2, 10);

const randomSentence = () =>
  Array.from({ length: 8 }, randomWord).join(" ");

const randomDateBetween = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const generateRandomItems = (count = 100) => {
  const now = new Date();
  const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  const randomIdx = Math.floor(Math.random() * 8);
  const userId = userIds['gmharper'];

  return Array.from({ length: count }).map(() => {
    const createdAt = randomDateBetween(past, now);
    const updatedAt = randomDateBetween(createdAt, now);

    return {
      _id: new ObjectId(),
      name: randomWord(),
      description: randomSentence(),
      color: randomHexColor(),
      author: userId,
      createdAt,
      updatedAt,
    };
  });
};
