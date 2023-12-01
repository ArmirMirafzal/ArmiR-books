export namespace IEntity {
	export interface Book {
			author: string;
			cover: string;
			id: number;
			isbn: string;
			pages: number;
			published: number;
			title: string;
	}

	export interface UserKey {
		key: string;
	}
}

export namespace IContext {
	export interface BooksContextType {
		bookData: IEntity.Book[];
		setBookData: (books: IEntity.Book[]) => void;
		methods: {
			againGet: (books: IEntity.Book[]) => void
		}
	}
}
