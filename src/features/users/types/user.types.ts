export const userRoles = [
  { label: "Member", value: 0 },
  { label: "Librarian", value: 1 },
  { label: "Admin", value: 2 },
] as const;

export type UserRoleValue = (typeof userRoles)[number]["value"];
export type UserRoleName = (typeof userRoles)[number]["label"];

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRoleName;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type UserCreate = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRoleValue;
};

export type UserUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleValue;
  isActive: boolean;
};

export function getUserRoleValue(role: UserRoleName): UserRoleValue {
  return userRoles.find((userRole) => userRole.label === role)?.value ?? 0;
}
