import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../modules/auth/context";
import { Logout } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import { useBookData } from "../modules/home/context";
import useHeaders from "../utils/sign";
import { alert } from "../utils";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const Header = () => {
	const { user, logout } = useAuth();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";

	const mobileMenuId = "primary-search-account-menu-mobile";

	const [title, setTitle] = React.useState<string>("");
	const [loading, setLoading] = React.useState(false);
	const { setBookData } = useBookData();
	const { headersGetSearchBooks } = useHeaders({ url: title });

	const handleKeyPress = async (e: any) => {
		if (e.key === "Enter") {
			alert.info("Searching in database please wait...");
			setLoading(true);
			if (title.trim() !== "") {
				try {
					const response = await axios.get(`https://0001.uz/books/${title}`, { headers: headersGetSearchBooks });
					setBookData(response.data.data);
					alert.success("All datas");
					setLoading(false);
				} catch (error: any) {
					alert.error(error.response.data.message);
					setLoading(false);
				}
			}
		}
	};

	if (loading) {
		return (
			<Backdrop sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center", color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar sx={{ padding: "0 70px", background: "none", boxShadow: "none" }} position="static">
				<Toolbar>
					<svg cursor="pointer" onClick={() => window.location.reload()} width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M23.2965 13.8285C23.4013 13.933 23.4844 14.0571 23.5411 14.1938C23.5978 14.3305 23.627 14.477 23.627 14.625C23.627 14.773 23.5978 14.9195 23.5411 15.0562C23.4844 15.1928 23.4013 15.317 23.2965 15.4215L16.5465 22.1715C16.442 22.2763 16.3179 22.3594 16.1812 22.4161C16.0445 22.4728 15.898 22.502 15.75 22.502C15.602 22.502 15.4555 22.4728 15.3188 22.4161C15.1822 22.3594 15.058 22.2763 14.9535 22.1715L11.5785 18.7965C11.4739 18.6919 11.3909 18.5677 11.3343 18.4311C11.2777 18.2944 11.2486 18.1479 11.2486 18C11.2486 17.8521 11.2777 17.7056 11.3343 17.5689C11.3909 17.4323 11.4739 17.3081 11.5785 17.2035C11.6831 17.0989 11.8073 17.0159 11.944 16.9593C12.0806 16.9027 12.2271 16.8736 12.375 16.8736C12.5229 16.8736 12.6694 16.9027 12.8061 16.9593C12.9427 17.0159 13.0669 17.0989 13.1715 17.2035L15.75 19.7842L21.7035 13.8285C21.808 13.7237 21.9322 13.6406 22.0688 13.5839C22.2055 13.5272 22.352 13.498 22.5 13.498C22.648 13.498 22.7945 13.5272 22.9312 13.5839C23.0679 13.6406 23.192 13.7237 23.2965 13.8285Z"
							fill="white"
						/>
						<path
							d="M9.9135 7.5195C12.1623 5.5803 15.0305 4.50931 18 4.5C24.0525 4.5 29.0768 9 29.6235 14.8027C33.2055 15.309 36 18.3082 36 21.9893C36 26.0302 32.6295 29.25 28.5457 29.25H8.50725C3.843 29.25 0 25.5735 0 20.9655C0 16.9987 2.8485 13.7137 6.6195 12.8812C6.94125 10.9395 8.19 9.0045 9.9135 7.5195ZM11.3827 9.22275C9.6795 10.692 8.7885 12.4628 8.7885 13.8488V14.8568L7.78725 14.967C4.644 15.3112 2.25 17.892 2.25 20.9655C2.25 24.2663 5.0175 27 8.50725 27H28.5457C31.455 27 33.75 24.723 33.75 21.9893C33.75 19.2532 31.455 16.9762 28.5457 16.9762H27.4207V15.8512C27.423 10.8563 23.238 6.75 18 6.75C15.5697 6.75971 13.2229 7.63748 11.3827 9.225V9.22275Z"
							fill="#6200EE"
						/>
						<path
							d="M57.404 25V12.31H62.966C64.346 12.31 65.408 12.604 66.152 13.192C66.896 13.768 67.268 14.572 67.268 15.604C67.268 16.372 67.04 17.02 66.584 17.548C66.128 18.076 65.498 18.43 64.694 18.61V18.34C65.618 18.472 66.332 18.808 66.836 19.348C67.352 19.876 67.61 20.578 67.61 21.454C67.61 22.582 67.22 23.458 66.44 24.082C65.66 24.694 64.574 25 63.182 25H57.404ZM59.636 23.236H62.912C63.692 23.236 64.298 23.092 64.73 22.804C65.162 22.504 65.378 22.018 65.378 21.346C65.378 20.662 65.162 20.176 64.73 19.888C64.298 19.588 63.692 19.438 62.912 19.438H59.636V23.236ZM59.636 17.692H62.57C63.398 17.692 64.01 17.542 64.406 17.242C64.814 16.93 65.018 16.474 65.018 15.874C65.018 15.274 64.814 14.824 64.406 14.524C64.01 14.212 63.398 14.056 62.57 14.056H59.636V17.692ZM74.3317 25.18C73.3957 25.18 72.5857 24.988 71.9017 24.604C71.2177 24.22 70.6837 23.674 70.2997 22.966C69.9277 22.258 69.7417 21.418 69.7417 20.446C69.7417 19.474 69.9277 18.64 70.2997 17.944C70.6837 17.236 71.2177 16.69 71.9017 16.306C72.5857 15.922 73.3957 15.73 74.3317 15.73C75.2677 15.73 76.0777 15.922 76.7617 16.306C77.4577 16.69 77.9917 17.236 78.3637 17.944C78.7477 18.64 78.9397 19.474 78.9397 20.446C78.9397 21.418 78.7477 22.258 78.3637 22.966C77.9917 23.674 77.4577 24.22 76.7617 24.604C76.0777 24.988 75.2677 25.18 74.3317 25.18ZM74.3317 23.452C75.0397 23.452 75.6037 23.206 76.0237 22.714C76.4437 22.21 76.6537 21.454 76.6537 20.446C76.6537 19.438 76.4437 18.688 76.0237 18.196C75.6037 17.704 75.0397 17.458 74.3317 17.458C73.6237 17.458 73.0597 17.704 72.6397 18.196C72.2197 18.688 72.0097 19.438 72.0097 20.446C72.0097 21.454 72.2197 22.21 72.6397 22.714C73.0597 23.206 73.6237 23.452 74.3317 23.452ZM85.5601 25.18C84.6241 25.18 83.8141 24.988 83.1301 24.604C82.4461 24.22 81.9121 23.674 81.5281 22.966C81.1561 22.258 80.9701 21.418 80.9701 20.446C80.9701 19.474 81.1561 18.64 81.5281 17.944C81.9121 17.236 82.4461 16.69 83.1301 16.306C83.8141 15.922 84.6241 15.73 85.5601 15.73C86.4961 15.73 87.3061 15.922 87.9901 16.306C88.6861 16.69 89.2201 17.236 89.5921 17.944C89.9761 18.64 90.1681 19.474 90.1681 20.446C90.1681 21.418 89.9761 22.258 89.5921 22.966C89.2201 23.674 88.6861 24.22 87.9901 24.604C87.3061 24.988 86.4961 25.18 85.5601 25.18ZM85.5601 23.452C86.2681 23.452 86.8321 23.206 87.2521 22.714C87.6721 22.21 87.8821 21.454 87.8821 20.446C87.8821 19.438 87.6721 18.688 87.2521 18.196C86.8321 17.704 86.2681 17.458 85.5601 17.458C84.8521 17.458 84.2881 17.704 83.8681 18.196C83.4481 18.688 83.2381 19.438 83.2381 20.446C83.2381 21.454 83.4481 22.21 83.8681 22.714C84.2881 23.206 84.8521 23.452 85.5601 23.452ZM92.6844 25V11.752H94.9344V19.78H94.9704L98.6604 15.91H101.378L96.7884 20.716L96.8064 19.816L101.702 25H98.9124L94.9704 20.932H94.9344V25H92.6844ZM106.291 25.18C105.511 25.18 104.791 25.09 104.131 24.91C103.483 24.718 102.937 24.454 102.493 24.118L103.123 22.606C103.579 22.918 104.083 23.158 104.635 23.326C105.187 23.494 105.745 23.578 106.309 23.578C106.909 23.578 107.353 23.476 107.641 23.272C107.941 23.068 108.091 22.792 108.091 22.444C108.091 22.168 107.995 21.952 107.803 21.796C107.623 21.628 107.329 21.502 106.921 21.418L105.121 21.076C104.353 20.908 103.765 20.62 103.357 20.212C102.961 19.804 102.763 19.27 102.763 18.61C102.763 18.046 102.913 17.548 103.213 17.116C103.525 16.684 103.963 16.348 104.527 16.108C105.103 15.856 105.775 15.73 106.543 15.73C107.215 15.73 107.845 15.82 108.433 16C109.033 16.18 109.537 16.45 109.945 16.81L109.297 18.268C108.925 17.968 108.499 17.734 108.019 17.566C107.539 17.398 107.071 17.314 106.615 17.314C105.991 17.314 105.535 17.428 105.247 17.656C104.959 17.872 104.815 18.154 104.815 18.502C104.815 18.766 104.899 18.988 105.067 19.168C105.247 19.336 105.523 19.462 105.895 19.546L107.695 19.888C108.499 20.044 109.105 20.32 109.513 20.716C109.933 21.1 110.143 21.628 110.143 22.3C110.143 22.9 109.981 23.416 109.657 23.848C109.333 24.28 108.883 24.61 108.307 24.838C107.731 25.066 107.059 25.18 106.291 25.18Z"
							fill="#6200EE"
						/>
						<path
							d="M118.34 25V12.31H120.662V23.038H126.638V25H118.34ZM128.809 25V15.91H131.059V25H128.809ZM128.683 14.2V12.004H131.185V14.2H128.683ZM137.318 25.18C136.538 25.18 135.818 25.09 135.158 24.91C134.51 24.718 133.964 24.454 133.52 24.118L134.15 22.606C134.606 22.918 135.11 23.158 135.662 23.326C136.214 23.494 136.772 23.578 137.336 23.578C137.936 23.578 138.38 23.476 138.668 23.272C138.968 23.068 139.118 22.792 139.118 22.444C139.118 22.168 139.022 21.952 138.83 21.796C138.65 21.628 138.356 21.502 137.948 21.418L136.148 21.076C135.38 20.908 134.792 20.62 134.384 20.212C133.988 19.804 133.79 19.27 133.79 18.61C133.79 18.046 133.94 17.548 134.24 17.116C134.552 16.684 134.99 16.348 135.554 16.108C136.13 15.856 136.802 15.73 137.57 15.73C138.242 15.73 138.872 15.82 139.46 16C140.06 16.18 140.564 16.45 140.972 16.81L140.324 18.268C139.952 17.968 139.526 17.734 139.046 17.566C138.566 17.398 138.098 17.314 137.642 17.314C137.018 17.314 136.562 17.428 136.274 17.656C135.986 17.872 135.842 18.154 135.842 18.502C135.842 18.766 135.926 18.988 136.094 19.168C136.274 19.336 136.55 19.462 136.922 19.546L138.722 19.888C139.526 20.044 140.132 20.32 140.54 20.716C140.96 21.1 141.17 21.628 141.17 22.3C141.17 22.9 141.008 23.416 140.684 23.848C140.36 24.28 139.91 24.61 139.334 24.838C138.758 25.066 138.086 25.18 137.318 25.18ZM147.472 25.18C146.392 25.18 145.576 24.898 145.024 24.334C144.472 23.77 144.196 22.924 144.196 21.796V17.602H142.45V15.91H144.196V13.588L146.446 13.012V15.91H148.876V17.602H146.446V21.652C146.446 22.276 146.566 22.714 146.806 22.966C147.046 23.218 147.376 23.344 147.796 23.344C148.024 23.344 148.216 23.326 148.372 23.29C148.54 23.254 148.702 23.206 148.858 23.146V24.928C148.654 25.012 148.426 25.072 148.174 25.108C147.934 25.156 147.7 25.18 147.472 25.18Z"
							fill="white"
						/>
					</svg>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase disabled={loading} onChange={(e) => setTitle(e.target.value)} onKeyPress={handleKeyPress} placeholder="Search ..." inputProps={{ "aria-label": "search" }} />
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={2} color="error">
								<NotificationsIcon color="action" fontSize="inherit" />
							</Badge>
						</IconButton>
						<IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
							<AccountCircle color="action" fontSize="inherit" />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{/* render mobile menu */}
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}
			>
				<MenuItem>
					<IconButton size="large" aria-label="show 4 new mails" color="inherit">
						<Badge badgeContent={4} color="error">
							<MailIcon />
						</Badge>
					</IconButton>
					<p>Messages</p>
				</MenuItem>
				<MenuItem>
					<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
						<Badge badgeContent={17} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<p>Notifications</p>
				</MenuItem>
				<MenuItem onClick={handleProfileMenuOpen}>
					<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</Menu>

			{/* renderMenu */}
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id={menuId}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>
				<MenuItem onClick={handleMenuClose}>{user?.name}</MenuItem>
				<MenuItem onClick={logout}>
					<Logout color="error" />
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default Header;
