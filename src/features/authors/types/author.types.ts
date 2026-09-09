export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  countryName: string;
};

export type AuthorCreate = {
  firstName: string;
  lastName: string;
  countryId: number;
};

export type AuthorUpdate = {
  firstName: string;
  lastName: string;
  countryId: number;
};
