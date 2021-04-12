import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Drawer,
	AppBar,
	CssBaseline,
	Toolbar,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import bcpIcon from "../../images/bcp-icon.png";
import largeLogo from "../../images/logo-gbp.png";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CustomSubDrawer from "./CustomSubDrawer";
import { DrawerData } from "./DrawersData";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		// "& ."
	},
	appBar: {
		flexGrow: 1,
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		flexShrink: 0,
	},
	drawerPaper: {
		width: 235,
		marginTop: 100,
	},
	largeLogo: {
		marginTop: "10px",
		marginBottom: "10px",
	},
	icon: {
		color: "rgba(0, 0, 0, 0.54)",
		display: "inline - flex",
		minWidth: 0,
		flexShrink: 0,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	bcpIcon: {
		height: 40,
		width: 40,
		marginRight: 16,
	},
}));

function CustomDrawer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="static" className={classes.appBar} color="transparent">
				<Toolbar>
					<Link to="/">
						<img
							src={largeLogo}
							alt="Kitty Katty!"
							className={classes.largeLogo}
						/>
					</Link>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<Link to="/" style={{ textDecoration: "none", color: "#2c0b06" }}>
							<ListItem button>
								<ListItemAvatar>
									<Avatar
										alt={"BCP Icon"}
										src={bcpIcon}
										className={classes.bcpIcon}
									/>
								</ListItemAvatar>
								<ListItemText primary={"Home"} />
							</ListItem>
						</Link>
						{DrawerData.map((item, index) => {
							return <CustomSubDrawer item={item} key={index} />;
						})}
					</List>
				</div>
			</Drawer>
		</div>
	);
}

export default CustomDrawer;
