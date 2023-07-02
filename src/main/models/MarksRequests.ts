import { Request, Response } from '../lib/Request';
import { Marks } from './Marks';

export type MarksRequests = Request<object, Marks>;

export type MarksResponse = Response<Marks>;
