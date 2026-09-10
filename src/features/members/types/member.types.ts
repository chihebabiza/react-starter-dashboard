export type Member = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
};

export type MemberCreate = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type MemberUpdate = {
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
};
