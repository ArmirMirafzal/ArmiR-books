import { FunctionComponent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import useHeaders from "../../utils/sign";
import { alert } from "../../utils";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import { useBookData } from "../../modules/home/context";
import { Book, CreateModal, Header } from "../../components";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const { bookData, setBookData, methods } = useBookData();

	const [open, setOpen] = useState(false);
	const [isbn, setIsbn] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { headersGetBooks, headersCreateBook } = useHeaders({ isbn });

	console.log("headers info =>>>", headersGetBooks);

	useEffect(() => {
		const getBooks = async () => {
			try {
				const response = await axios.get("https://0001.uz/books", { headers: headersGetBooks });

				console.log("data books => ", response.data.data);

				const { data } = response.data;
				if (Array.isArray(data)) {
					setBookData(data.map((item) => item.book));
					methods.againGet(data.map((item) => item.book));
				}

				setLoading(false);
			} catch (err: any) {
				console.log("get books error => ❗❗", err.response.data.message);
				alert.error(err.response.data.message);
				setLoading(false);
			}
		};

		getBooks();
	}, []);

	const handelCreateBook = async () => {
		setLoading(true);
		const requestData = JSON.stringify({ isbn });
		const headers = headersCreateBook;

		try {
			const response = await axios.post("https://0001.uz/books", requestData, { headers });

			setBookData(response.data.data);
			alert.success("Successfully created");
			handleClose();
			setLoading(false);
			methods.againGet(response.data.data);
			window.location.reload();
		} catch (err: any) {
			alert.error(err?.response?.data?.message);
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	return (
		<>
			<Header />

			<Box padding="0 100px" mt="36px">
				<Grid container spacing={2} justifyContent={"space-between"}>
					<Grid item>
						<Typography fontFamily="Mulish" fontWeight={700} fontSize="36px" color="white">
							You`ve got <span style={{ color: "#6200EE" }}>{bookData?.length}</span>
						</Typography>
					</Grid>

					<Grid item alignItems="center" justifyContent="center">
						<Box display="flex" gap={5}>
							<Button onClick={handleOpen} sx={{ marginLeft: "650px", height: "50px", width: "240px", bgcolor: "#6200EE", fontSize: "16px", fontFamily: "Mulish", color: "#FEFEFE", textTransform: "none", "&:hover": { background: "#6200EE" } }}>
								+ Create a book
							</Button>
						</Box>
					</Grid>

					<Grid item>
						<Typography fontFamily="Mulish" fontSize={"20px"} fontWeight={400} color={"#FEFEFE"}>
							Your books
						</Typography>
					</Grid>
				</Grid>

				<Book bookData={bookData} setBookData={setBookData} methods={methods} />

				<CreateModal open={open} handleClose={handleClose} setIsbn={setIsbn} handelCreateBook={handelCreateBook} loading={loading} />
			</Box>
		</>
	);
};

export default Home;
