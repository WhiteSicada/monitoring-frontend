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
import {Main as ListTeams} from "./components/Teams/Main";

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
						{/* <Route path="/" exact component={HomePage}></Route>
						<Route path="/New-Project" exact component={CreateProject}></Route>
						<Route path="/Projects" exact component={ListProjects}></Route> */}
						{/* <Route exact path="/Projects/:project" component={ListApiProjects}></Route> */}
						{/* <Route exact path="/Projects/:project/:api/anomalie" component={Anomaly}></Route> */}
						{/* <Route exact path="/Anomalies" component={ListAnomalies}></Route>
						<Route path="/CreateTeam" exact component={CreateTeam}></Route> */}
						<Route path="/ListTeams" exact component={ListTeams}></Route>
					</Switch>
				</div>
				<CssBaseline />
			</ThemeProvider>
		</Router>
	);
}

export default App;
