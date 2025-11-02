export enum ModalTypes {
  None = 0,
  Scrollable = 1 << 0,
  Centered = 1 << 1,
  FullScreen = 1 << 2,
  BlockingModal = 1 << 3,
};

export enum ModalButtons {
  None = 0,
  ButtonCancel = 1 << 1,
  ButtonOK = 1 << 2,
};
