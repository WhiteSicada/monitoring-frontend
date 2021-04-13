import axios from "axios";

const customAxios = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		"Content-type": "application/json",
	},
});

const createTeam = (team) => {
	return customAxios.post("/equipe", team);
};

const getTeams = () => {
	return customAxios.get("/equipes");
};

const deleteTeam = (id) => {
	return customAxios.delete(`/equipe/${id}`);
};

const updateTeam = (id, team) => {
	return customAxios.put(`/equipe/${id}`, team);
};

const TeamService = {
	createTeam,
	getTeams,
	deleteTeam,
	updateTeam,
};

export default TeamService;
