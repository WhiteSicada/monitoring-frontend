import React from "react";
import {
	TableBody,
	TableRow,
	TableCell,
	Chip,
	Button,
} from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { Controls } from "../controls/controls";
import { useHistory } from "react-router-dom";

function ScansTable({ recordsAfterPadingAndSorting, openInViewPopup }) {
	const history = useHistory();
	// function goToScanList(test) {
	// 	history.push(`/tests/${test.id}`);
	// }
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((scan, index) => (
				<TableRow key={scan.id}>
					<TableCell>{scan.creates_at}</TableCell>
					<TableCell>{scan.status}</TableCell>
					<TableCell>{scan.spark}</TableCell>
					<TableCell>
						{scan.successful == "Successful" ? (
							<Chip
								variant="outlined"
								icon={<FaCheckCircle style={{ color: "green" }} />}
								label={scan.successful}
							/>
						) : (
							<Chip
								variant="outlined"
								icon={<AiFillCloseCircle style={{ color: "red" }} />}
								label={scan.successful}
							/>
						)}
					</TableCell>
					<TableCell>{scan.execution_time} ms</TableCell>
					<TableCell>{scan.api}</TableCell>
					<TableCell>{scan.endpoint}</TableCell>
					<TableCell>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => {
								openInViewPopup(scan);
							}}
							startIcon={<AiOutlineInfoCircle />}
						>
							View More
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default ScansTable;
