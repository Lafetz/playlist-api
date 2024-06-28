export interface CreateUser {
  email: string;
  password: string;
}

export interface UpdateUser {
  email?: string;
  password?: string;
}
