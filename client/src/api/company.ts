import { useMutation, useQuery, QueryClient } from "react-query";
import { Company } from "../types/company";
import axiosHttp from "./http";
import { PaginationModel } from "../views/Admin";

export type CompanyResponse = {
  companies: Company[];
  page: number;
  total: number;
};

const queryClient = new QueryClient();

const getCompanies = (pagination: PaginationModel) => {
  return axiosHttp
    .get<CompanyResponse>("/companies/", {
      params: {
        ...pagination
      }
    })
    .then((res) => res.data);
};

export const useCompaniesFetch = (pagination: PaginationModel) => {
  return useQuery({
    queryKey: ["companies", pagination.page, pagination.pageSize],
    queryFn: () => getCompanies(pagination)
  });
};

const createCompany = (company: Company) => {
  return axiosHttp
    .post<Company>("/companies/", company)
    .then((res) => res.data);
};

export const useAddCompany = () => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => queryClient.invalidateQueries("companies")
  });
};
