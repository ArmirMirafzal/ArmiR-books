import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Modal, TextField } from "@mui/material";

const modalStyle = {
	width: "430px",
	borderRadius: "12px",
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export interface CreateModalProps {
	openEdit: boolean;
	loading: boolean;
	bookID: number;
	handleCloseEdit: () => void;
	handleOpenEdit: () => void;
	handleEditBook: (id: number) => void;
	setEditId: (id: number) => void;
	setStatus: (status: string) => void;
}

const EditModal = ({ openEdit, handleCloseEdit, setStatus, handleOpenEdit, handleEditBook, loading, setEditId, bookID }: CreateModalProps) => {
	return (
		<Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box sx={modalStyle}>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography fontFamily="Mulish" id="modal-modal-title" variant="h6" component="h2">
						Edit Book
					</Typography>
					<svg cursor="pointer" onClick={handleCloseEdit} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
						<path d="M15 9.5L9 15.5M9 9.5L15 15.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z" stroke="#151515" />
					</svg>
				</Box>
				<TextField onChange={(e) => setStatus(e.target.value)} variant="standard" type="number" placeholder="Enter status ..." InputProps={{ disableUnderline: true }} style={{ marginTop: "10px", background: "white", width: "100%", height: "47px", padding: "10px 16px", border: "1px solid #EBEBEB", borderRadius: "6px", borderColor: "none" }} />
				<Box display="flex" gap="20px" marginTop="20px">
					<Button onClick={() => handleCloseEdit()} sx={{ width: "200px", bgcolor: "none", border: "solid 1px #6200EE", fontSize: "16px", fontFamily: "Mulish", color: "#6200EE", textTransform: "none", "&:hover": { background: "white" } }}>
						Close
					</Button>
					<Button
						onClick={() => {
							handleOpenEdit();
							handleEditBook(bookID);
							setEditId(bookID);
						}}
						disabled={loading}
						sx={{ width: "200px", bgcolor: "#6200EE", fontSize: "16px", fontFamily: "Mulish", color: "#FEFEFE", textTransform: "none", "&:hover": { background: "#6200EE" } }}
					>
						{loading ? "Loading..." : "Submit"}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default EditModal;
