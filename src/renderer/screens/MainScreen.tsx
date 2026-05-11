import { useDocument } from '../entities/document';

export default function MainScreen() {
  const { state } = useDocument();
  return <div>{ JSON.stringify(state) }</div>;
}
