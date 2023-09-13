import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AddCompanyDialog } from "./AddCompanyDialog";
import { useState } from "react";
import { useCompaniesFetch } from "../../api";

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

export const Admin = () => {
  const [open, setOpen] = useState(false);
  const { data } = useCompaniesFetch();

  console.log(data);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box>
        <Button onClick={() => setOpen(true)}>Add Company</Button>
      </Box>
      <DataGrid
        rows={data?.companies ?? []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <AddCompanyDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
