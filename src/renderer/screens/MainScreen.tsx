import { useDocument, useInitializeDocument } from '../entities/document';

export default function MainScreen() {
  const { document } = useDocument();
  useInitializeDocument();

  return <div>{ JSON.stringify(document) }</div>;
}
