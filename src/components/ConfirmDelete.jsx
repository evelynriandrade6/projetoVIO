import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function ConfirmDelete({ open, onClose, onConfirm, userName }) {

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography> Deseja mesmo excluir o usuário:</Typography>
                <p>{userName} ? </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancelar
                </Button>
                <Button onClick={onConfirm}>
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDelete;
