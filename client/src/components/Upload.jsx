import { useEffect, useState } from "react";

const Upload = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:5000/api/upload")
			.then((res) => {
				if (!res.ok) {
					throw new Error("No submission found");
				}
				return res.json();
			})
			.then((result) => setData(result))
			.catch((err) => setError(err.message));
	}, []);

	if (error) {
		return (
			<div style={{ padding: "40px" }}>
				<h2>Error</h2>
				<p>{error}</p>
			</div>
		);
	}

	if (!data) {
		return <div style={{ padding: "40px" }}>Loading...</div>;
	}

	return (
		<div style={{ padding: "40px" }}>
			<h2>Vehicle Selection Result:</h2>

			<p><strong>Make:</strong> {data.make}</p>
			<p><strong>Model:</strong> {data.model}</p>
			<p><strong>Badge:</strong> {data.badge}</p>

			<h3>Logbook Contents:</h3>
			<pre
				style={{
					background: "#f4f4f4",
					padding: "15px",
					borderRadius: "6px",
				}}
			>
				{data.logbook}
			</pre>
		</div>
	);
};

export default Upload;