import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AddCompanyDialog } from "./AddCompanyDialog";
import { useState } from "react";
import { useAddCompany, useCompaniesFetch } from "../../api";
import { Company } from "../../types/company";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Company name",
    width: 200
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true
  },
  {
    field: "region",
    headerName: "Region",
    width: 110,
    editable: true
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
    editable: true
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 200,
    editable: true
  }
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`
  // }
];

export type PaginationModel = {
  pageSize: number;
  page: number;
};

export const Admin = () => {
  const [open, setOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0
  });
  const { data, isLoading } = useCompaniesFetch(paginationModel);
  const { mutateAsync } = useAddCompany();

  const handleUpdate = async (companyData: Company) => {
    try {
      mutateAsync(companyData);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Button onClick={() => setOpen(true)}>Add Company</Button>
      </Box>
      <DataGrid
        rows={data?.companies ?? []}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel
          }
        }}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        pageSizeOptions={[5, 10, 15, 20]}
        rowCount={data?.total ?? 0}
        disableRowSelectionOnClick
      />
      <AddCompanyDialog
        open={open}
        onClose={() => setOpen(false)}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};
