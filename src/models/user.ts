export interface User {
  userId: string;
  email: string;
  displayName?: string;
  profilePictureUrl?: string;
  bio?: string;
  birthDate?: string;
  gender?: string;
  token: string;
}

export default User;
