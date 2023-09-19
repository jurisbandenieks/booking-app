import { Dialog, DialogTitle } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  TextField,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { Company } from "../../types/company";
import { useEffect } from "react";
import { useDeleteCompany, useUpsertdCompany } from "../../api";

export type Props = {
  open: boolean;
  row: Company | undefined;
  onClose: () => void;
};

export const AddCompanyDialog: React.FC<Props> = ({ onClose, row, open }) => {
  const { mutateAsync: updateCompany } = useUpsertdCompany();
  const { mutateAsync: deleteCompany } = useDeleteCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<Company>({ defaultValues: mapDefaultValues(row) });

  useEffect(() => {
    reset(mapDefaultValues(row));
  }, [row]);

  const registerCompany: SubmitHandler<Company> = (companyInputs) => {
    try {
      updateCompany(companyInputs);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const removeCompany = () => {
    const id = getValues("id");
    try {
      if (!!id && id >= 0) {
        deleteCompany(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Company</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
          onSubmit={handleSubmit(registerCompany)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <TextField
            id="company-name-input"
            label="Company name"
            variant="outlined"
            type="text"
            error={!!errors.name}
            margin="normal"
            {...register("name", { required: true })}
            aria-label="company name input"
          />
          <TextField
            id="company-country-input"
            label="Company country"
            variant="outlined"
            type="text"
            error={!!errors.country}
            margin="normal"
            {...register("country", { required: true })}
            aria-label="company country input"
          />
          <TextField
            id="company-region-input"
            label="Company region"
            variant="outlined"
            type="text"
            error={!!errors.region}
            margin="normal"
            {...register("region", { required: true })}
            aria-label="company region input"
          />
          <TextField
            id="company-address-input"
            label="Company address"
            variant="outlined"
            type="text"
            error={!!errors.address}
            margin="normal"
            {...register("address", { required: true })}
            aria-label="company address input"
          />
          <TextField
            id="company-phoneNumber-input"
            label="Company phone number"
            variant="outlined"
            type="text"
            error={!!errors.phoneNumber}
            margin="normal"
            {...register("phoneNumber", { required: true })}
            aria-label="company phone number input"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={removeCompany}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(registerCompany)}>Register</Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDefaultValues = (row: Company | undefined) => {
  return {
    id: row?.id ?? undefined,
    name: row?.name ?? "",
    country: row?.country ?? "",
    region: row?.region ?? "",
    address: row?.address ?? "",
    phoneNumber: row?.phoneNumber ?? ""
  };
};
