export type FactureType = {
  id: string;
  client: ClientType;
  clientId: string;
  companyName: string;
  total: string;
  title: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type ClientType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  facture: Array<object>;
  createdAt: Date | string;
  updatedAt: Date | string;
};
