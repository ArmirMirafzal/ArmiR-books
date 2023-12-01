import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./routes";
import { AuthProvider } from "./modules/auth/context";
import "./main.css";
import "./assets/fonts/mulish.css";
import { BookProvider } from "./modules/home/context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<AuthProvider>
		<BookProvider>
			<Routes />
		</BookProvider>
	</AuthProvider>
);
