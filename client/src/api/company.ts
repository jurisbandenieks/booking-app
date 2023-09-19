import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from "react-query";
import { Company } from "../types/company";
import axiosHttp from "./http";
import { PaginationModel } from "../views/Admin";

export type CompanyResponse = {
  companies: Company[];
  page: number;
  total: number;
};

const invalidateCompanies = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: "companies"
  });
};

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
    queryKey: [
      "companies",
      { page: pagination.page, size: pagination.pageSize }
    ],
    queryFn: () => getCompanies(pagination)
  });
};

const createCompany = (company: Company) => {
  if (company.id) {
    return axiosHttp
      .put<Company>(`/companies/${company.id}`, company)
      .then((res) => res.data);
  }
  return axiosHttp
    .post<Company>("/companies/", company)
    .then((res) => res.data);
};

export const useUpsertdCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => invalidateCompanies(queryClient)
  });
};

const deleteCompany = (id: number) => {
  return axiosHttp.delete<Company>(`/companies/${id}`).then((res) => res.data);
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => invalidateCompanies(queryClient)
  });
};
