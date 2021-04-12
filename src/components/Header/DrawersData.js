import React from "react";
import * as FiIcons from "react-icons/fi";
import * as TiIcons from "react-icons/ti";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as FaIcons from "react-icons/fa";


export const DrawerData = [
	{
		title: "Projetcs",
		icon: <TiIcons.TiFolderOpen style={{ fontSize: 35, color: "#2c0b06" }} />,
		path : "/Projetcs",

		subNavs: [
			{
				title: "All Projects",
				path: "/Projects",
				icon: <BsIcons.BsArchive style={{ color: "#ec6413" }} />,
			},
			{
				title: "Create Project",
				path: "/New-Project",
				icon: <FiIcons.FiFolderPlus style={{ color: "#ec6413" }} />,
			},
		],
	},
	{
		title: "APIs",
		icon: <FaIcons.FaCubes style={{ fontSize: 35, color: "#2c0b06" }} />,
		path : "/APIs",

		subNavs: [
			{
				title: "All APIs",
				path: "/Projects",
				icon: <BsIcons.BsArchive  style={{ color: "#ec6413" }} />,
			},
			{
				title: "Create API",
				path: "/New-Project",
				icon: <FiIcons.FiFolderPlus  style={{ color: "#ec6413" }} />,
			},
		],
	},
	{
		title: "Teams",
		icon: (
			<HiIcons.HiOutlineUserGroup style={{ fontSize: 35, color: "#2c0b06" }} />
		),
		path : "/Teams",

		// subNavs: [
		// 	{
		// 		title: "All Teams",
		// 		path: "/ListTeams",
		// 		icon: <BsIcons.BsArchive  style={{ color: "#ec6413" }} />,
		// 	},
		// 	{
		// 		title: "Create Team",
		// 		path: "/CreateTeam",
		// 		icon: <FiIcons.FiFolderPlus  style={{ color: "#ec6413" }} />,
		// 	},
		// ],
	},
	{
		title: "Responsables",
		icon: (
			<RiIcons.RiUserSettingsLine style={{ fontSize: 35, color: "#2c0b06" }} />
		),
		path : "/Responsables",

		subNavs: [
			{
				title: "All Responsables",
				path: "/Projects",
				icon: <BsIcons.BsArchive  style={{ color: "#ec6413" }} />,
			},
			{
				title: "Create Responsable",
				path: "/New-Project",
				icon: <FiIcons.FiFolderPlus  style={{ color: "#ec6413" }} />,
			},
		],
	},
];
