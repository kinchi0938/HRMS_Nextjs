import { IComment } from "./comment.type";

export interface IEmployee {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  housenumber: string;
  zipcode: number;
  city: string;
  country: string;
  role: string;
  admin: boolean;
  comments: Array<IComment>;
}
