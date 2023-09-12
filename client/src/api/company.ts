import { Company } from "../types/company";
import axiosHttp from "./http";

type CompanyResponse = {
  companies: Company[];
  page: number;
  pages: number;
};

export const fetchCompanies = async (): Promise<CompanyResponse> => {
  const { data } = await axiosHttp.get("/companies/");
  return data;
};
