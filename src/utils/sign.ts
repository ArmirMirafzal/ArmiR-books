import { useAuth } from "../modules/auth/context";
import md5 from "md5";

const sign = (method: string, url: string, body: string, userSecret: string) => {
	const stringToSign = `${method}${url}${body}${userSecret}`;
	const md5Sign = md5(stringToSign);
	return md5Sign;
};

interface HookProps {
	isbn?: string;
	url?: string;
	deleteId?: number;
	editId?: number;
	status?: string;
}

const useHeaders = ({ isbn, url, deleteId, editId, status }: HookProps) => {
	const { user } = useAuth();
	const userKey = user?.key || "";
	const userSecret = user?.secret || "";

	const getBooks = {
		method: "GET",
		url: "/books",
		body: "",
	};

	const createBook = {
		method: "POST",
		url: "/books",
		body: JSON.stringify({ isbn }),
	};

	const getSearchBooks = {
		method: "GET",
		url: `/books/${url}`,
		body: "",
	};

	const deleteBook = {
		method: "DELETE",
		url: `/books/${deleteId}`,
		body: "",
	};

	const editBook = {
		method: "PATCH",
		url: `/books/${editId}`,
		body: JSON.stringify({ status }),
	};

	const headersGetBooks = {
		Key: userKey,
		Sign: sign(getBooks.method, getBooks.url, getBooks.body, userSecret),
	};

	const headersCreateBook = {
		Key: userKey,
		Sign: sign(createBook.method, createBook.url, createBook.body, userSecret),
	};

	const headersGetSearchBooks = {
		Key: userKey,
		Sign: sign(getSearchBooks.method, getSearchBooks.url, getSearchBooks.body, userSecret),
	};

	const headersDeleteBook = {
		Key: userKey,
		Sign: sign(deleteBook.method, deleteBook.url, deleteBook.body, userSecret),
	};

	const headersEditBook = {
		Key: userKey,
		Sign: sign(editBook.method, editBook.url, editBook.body, userSecret),
	};

	return { headersGetBooks, headersCreateBook, headersGetSearchBooks, headersDeleteBook, headersEditBook };
};

export default useHeaders;
