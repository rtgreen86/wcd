import * as ACTIONS from './action-creators';

export type Action = ReturnType<typeof ACTIONS[keyof typeof ACTIONS]>;

export type ActionType = Action["type"];
