import { Request, Response } from '../lib/Request';
// import { Marks } from './Marks';

type Marks = any;

export type MarksRequests = Request<object, Marks>;

export type MarksResponse = Response<Marks>;
