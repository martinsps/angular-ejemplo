export interface User {
  id: number;
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}

export interface ApiUsersResponse {
  results: User[];
}
