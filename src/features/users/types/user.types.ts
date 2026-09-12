export type UserRole = number;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type UserCreate = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

export type UserUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
};
