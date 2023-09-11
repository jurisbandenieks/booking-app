import axios from "axios";
import { auth } from "../config";
import { Company } from "../types/company";

type CompanyResponse = {
  companies: Company[];
  page: number;
  pages: number;
};

export const fetchCompanies = async (): Promise<CompanyResponse> => {
  const token = await auth.currentUser?.getIdToken();

  const { data } = await axios.get("/api/companies/", {
    headers: { Authorization: token }
  });

  return data;
};
