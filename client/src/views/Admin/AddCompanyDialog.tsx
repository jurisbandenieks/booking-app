import { Dialog, DialogTitle } from "@mui/material";

export type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddCompanyDialog: React.FC<Props> = ({ onClose, open }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Company</DialogTitle>
    </Dialog>
  );
};
