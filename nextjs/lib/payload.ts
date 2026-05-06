export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
