import { GridColDef } from "@mui/x-data-grid";

export const companyColumns: GridColDef[] = [
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
