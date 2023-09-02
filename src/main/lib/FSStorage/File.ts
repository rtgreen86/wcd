import Savable from './Savable';
import Container from './Container';

export default interface File<Type> extends Savable, Container<Type> { }
