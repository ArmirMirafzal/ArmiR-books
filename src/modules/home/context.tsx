import React, { createContext, useContext, useState, ReactNode } from "react";
import { IContext, IEntity } from "./types";

const BookContext = createContext<IContext.BooksContextType | undefined>(undefined);

type BookProviderProps = {
	children: ReactNode;
};

export function BookProvider({ children }: BookProviderProps) {
	const [bookData, setBookData] = useState<IEntity.Book[]>([]);

	const methods = {
		againGet: (books: IEntity.Book[]) => setBookData(books),
	};

	return <BookContext.Provider value={{ bookData, setBookData, methods }}>{children}</BookContext.Provider>;
}

export function useBookData() {
	const context = useContext(BookContext);
	if (!context) {
		throw new Error("useBookData must be used within a BookProvider");
	}
	return context;
}
