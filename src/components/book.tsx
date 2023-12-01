import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Badge, Grid } from "@mui/material";
import { IEntity } from "../modules/home/types";
import { useState } from "react";
import axios from "axios";
import { alert } from "../utils";
import useHeaders from "../utils/sign";
import EditModal from "./edit-modal";

export interface BookProps {
	bookData: IEntity.Book[];
	setBookData: (books: IEntity.Book[]) => void;
	methods: {
		againGet: (books: IEntity.Book[]) => void;
	};
}

const Book = ({ bookData, setBookData, methods }: BookProps) => {
	const [status, setStatus] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [deleteId, setDeleteId] = useState<number>(0);
	const [editId, setEditId] = useState<number>(0);

	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const { headersDeleteBook, headersEditBook } = useHeaders({ deleteId, editId, status });

	const handleDeleteBook = async (id: number) => {
		setDeleteId(id);
		console.log("delete id", id);
		try {
			const response = await axios.delete(`https://0001.uz/books/${id}`, { headers: headersDeleteBook });
			const { data } = response.data;
			if (Array.isArray(data)) {
				setBookData(data.map((item) => item.book));
				alert.success("Successfully deleted!");
				methods.againGet(data.map((item) => item.book));
			}
		} catch (error: any) {
			alert.warning("you clicked wrong, try again please");
			setLoading(false);
		}
	};

	const handleEditBook = async (id: number) => {
		setEditId(id);
		const requestData = JSON.stringify({ status });

		try {
			await axios.patch(`https://0001.uz/books/${id}`, requestData, { headers: headersEditBook });
			alert.success("Successfully edited!");
		} catch (error: any) {
			alert.error(error.response.data.message);
			setLoading(false);
		}
	};

	return (
		<Box className="grid-scroll" sx={{ height: "480px", width: "100%", overflowY: "scroll", gap: "30px", marginTop: "20px" }}>
			{Array.isArray(bookData) &&
				bookData?.map((book, idx) => {
					return (
						<>
							<Grid key={idx}>
								<Box className="card" width="400px" display="flex" alignItems="start">
									<Card sx={{ marginTop: "20px", boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)", transition: "all 0.2s", width: "400px", height: "200px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", borderRadius: "12px" }} variant="outlined">
										<Typography fontSize="16px" fontWeight={600} fontFamily={"Mulish"} color={"#151515"}>
											{book.title?.slice(0, 35)}...
										</Typography>
										<Typography fontFamily={"Mulish"} fontWeight={400} lineHeight="150%" fontSize="14px" color={"#333"}>
											{book.author}
										</Typography>
										<Box display="flex" alignItems="center" justifyContent="space-between">
											<Typography fontSize="14px" fontFamily="Mulish" fontWeight={500} color="black">
												{book.published}
											</Typography>
											<Badge sx={{ width: "100px", padding: "4px 10px", height: "30px", borderRadius: "8.5px", bgcolor: "#EFE6FD", color: "#9654F4" }}>{book.pages}</Badge>
										</Box>
									</Card>

									<div className="actions" style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "40px" }}>
										<div
											onClick={() => {
												setDeleteId(book?.id);
												handleDeleteBook(book?.id);
											}}
											style={{ width: "32px", height: "32px", background: "#FF4D4F", borderRadius: "6px 6px 6px 0", cursor: "pointer", padding: "6px 5px" }}
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 17 16" fill="none">
												<path
													d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
													stroke="#FEFEFE"
												/>
											</svg>
										</div>
										<div onClick={() => handleOpenEdit()} style={{ width: "32px", height: "32px", background: "#6200EE", borderRadius: "0px 6px 6px 6px", cursor: "pointer", padding: "6px 5px" }}>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 17 16" fill="none">
												<path
													d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
													stroke="#FEFEFE"
												/>
											</svg>
										</div>
									</div>
								</Box>
								<EditModal openEdit={openEdit} loading={loading} bookID={book.id} handleCloseEdit={handleCloseEdit} handleOpenEdit={handleOpenEdit} handleEditBook={handleEditBook} setEditId={setEditId} setStatus={setStatus} />
							</Grid>
						</>
					);
				})}
		</Box>
	);
};

export default Book;
