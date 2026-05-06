export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}
