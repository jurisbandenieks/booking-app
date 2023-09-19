import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AddCompanyDialog } from "./AddCompanyDialog";
import { useState } from "react";
import { useCompaniesFetch } from "../../api";
import { Company } from "../../types/company";
import { companyColumns } from "./columns";

export type PaginationModel = {
  pageSize: number;
  page: number;
};

export const Admin = () => {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<Company>();
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0
  });
  const { data, isLoading } = useCompaniesFetch(paginationModel);

  const handlePrefilledDialog = (e: GridRowParams<Company>) => {
    setRow(e.row);
    setOpen(true);
  };

  const handleOpenDialog = () => {
    setRow(undefined);
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Button onClick={handleOpenDialog}>Add Company</Button>
      </Box>
      <DataGrid
        rows={data?.companies ?? []}
        columns={companyColumns}
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
        onRowClick={handlePrefilledDialog}
      />
      <AddCompanyDialog open={open} row={row} onClose={() => setOpen(false)} />
    </Box>
  );
};
