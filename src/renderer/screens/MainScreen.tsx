import { useDocument } from '../entities/document';

export default function MainScreen() {
  const [document] = useDocument();
  return <div>{ JSON.stringify(document) }</div>;
}
