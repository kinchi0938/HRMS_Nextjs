export interface SignupRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  housenumber: string;
  zipcode: string;
  city: string;
  country: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: { username: string; id: string };
}
