import { useQuery } from "react-query";
import { Company } from "../types/company";
import axiosHttp from "./http";

type CompanyResponse = {
  companies: Company[];
  page: number;
  pages: number;
};

export const useCompaniesFetch = () => {
  return useQuery<CompanyResponse, Error>({
    queryKey: ["posts"],
    queryFn: (): Promise<CompanyResponse> =>
      axiosHttp.get<CompanyResponse>("/companies/").then((res) => res.data)
  });
};

export const addCompany = async (
  company: Company
): Promise<CompanyResponse> => {
  console.log(company);
  const { data } = await axiosHttp.post("/companies/", company);
  return data;
};
