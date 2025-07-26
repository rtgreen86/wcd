export interface Command {
  execute(): this;
  undo(): this;
}

export interface AsyncCommand {
  execute(): Promise<this>,
  undo(): Promise<this>,
}
