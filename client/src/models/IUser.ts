export enum UserRoleEnum {
  READER = "A_0",
  BLOGGER = "A_1",
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
}
