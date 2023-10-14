import * as ACTIONS from './ActionCreators';

export type Action = ReturnType<typeof ACTIONS[keyof typeof ACTIONS]>;

export type ActionType = Action["type"];
