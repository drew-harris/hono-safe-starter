// import type { GameState, Question } from "./state";

export type MessageTypes = {
  hello: { message: string };
};

export type MessageType = keyof MessageTypes;
export type Message<K extends keyof MessageTypes> = {
  type: K;
  data: MessageTypes[K];
};
