export default interface Container<Type> {
  content: Type;

  setContent(content: Type): typeof this;
}
