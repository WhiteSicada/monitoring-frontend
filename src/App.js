import "./App.css";
import React from "react";
import CustomDrawer from "./components/Header/CustomDrawer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	makeStyles,
	CssBaseline,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core";
import { Main as ListTeams } from "./components/Teams/Main";
import { Main as ItResponsables } from "./components/ItResponsables/Main";
import { Main as WorkResponsables } from "./components/WorkResponsable/Main";
import {
	ItResponsablesLink,
	TeamLink,
	WorkResponsableLink,
} from "./components/Header/StaticLinks";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ef630b",
			light: "#fcd1b6",
		},
		secondary: {
			main: "#f83245",
			light: "#f8324526",
		},
		background: {
			default: "#f4f5fd",
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: "translateZ(0)",
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CustomDrawer />
				<div className={"appMain"}>
					<Switch>
						<Route path={TeamLink} exact component={ListTeams}></Route>
						<Route
							path={ItResponsablesLink}
							exact
							component={ItResponsables}
						></Route>
						<Route
							path={WorkResponsableLink}
							exact
							component={WorkResponsables}
						></Route>
					</Switch>
				</div>
				<CssBaseline />
			</ThemeProvider>
		</Router>
	);
}

export default App;
