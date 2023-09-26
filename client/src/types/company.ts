export type CompanyModel = {
  id?: number;
  name: string;
  country: string;
  region: string;
  address: string;
  phoneNumber: string;
};

export type CompanyResponse = {
  companies: CompanyModel[];
  page: number;
  total: number;
};
