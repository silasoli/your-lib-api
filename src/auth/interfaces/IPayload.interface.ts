import mongoose from 'mongoose';

export interface IPayload {
  _id?: mongoose.ObjectId | string;

  email: string;

  name: string;

  access_token: string;
}

export interface ILoginPayload {
  id?: mongoose.ObjectId | string;

  email: string;

  name: string;

  access_token: string;
}
