import { IUser } from './user.model';

export interface IPost {
  id: number;
  author_id: number;
  title: string;
  content: string;
  author?: IUser;
  created_at: string;
  updated_at: string;
}
