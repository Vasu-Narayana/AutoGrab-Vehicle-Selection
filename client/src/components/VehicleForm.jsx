import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODELS } from '../data/models';
import AutoGrabLogo from '../assets/AutoGrab-logo.png';

const VehicleForm = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [badge, setBadge] = useState('');
	const [file, setFile] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const modelsForMake = useMemo(() => {
		return make ? Object.keys(MODELS[make]) : [];
	}, [make]);

	const badgesForModel = useMemo(() => {
		return make && model ? MODELS[make][model] : [];
	}, [make, model]);

	const handleMakeChange = (e) => {
		setMake(e.target.value);
		setModel('');
		setBadge('');
		setResult(null);
		setError('');
	};

	const handleModelChange = (e) => {
		setModel(e.target.value);
		setBadge('');
		setResult(null);
		setError('');
	};

	const handleBadgeChange = (e) => {
		setBadge(e.target.value);
		setResult(null);
		setError('');
	};

	const handleQuickSelect = (mk, mdl, bdg) => {
		setMake(mk);
		setModel(mdl);
		setBadge(bdg);
		setResult(null);
		setError('');
	};

	const handleSubmit = async (e) => {
	e.preventDefault();

	setError("");

	// Validation order
	if (!make) {
		setError("Please select a Make.");
		return;
	}

	if (!model) {
		setError("Please select a Model.");
		return;
	}

	if (!badge) {
		setError("Please select a Badge.");
		return;
	}

	if (!file) {
		setError("Please upload a Logbook file.");
		return;
	}

	const formData = new FormData();
	formData.append("make", make);
	formData.append("model", model);
	formData.append("badge", badge);
	formData.append("logbook", file);

	try {
		const response = await fetch("http://localhost:5000/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Upload failed. Please try again.");
		}

		// Clear form
		setMake("");
		setModel("");
		setBadge("");
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}

		navigate("/upload");

	} catch (err) {
		setError(err.message);
	}
};

	return (
		<div className="container">
			<div className="form-header">
				<img
				src={AutoGrabLogo}
				alt="AutoGrab"
				className="form-logo"/>
				<h2>Vehicle Selection</h2>
			</div>

			<button type="button" onClick={() => handleQuickSelect('tesla', 'Model 3', 'Performance')}>
				Tesla Model 3 – Performance
			</button>

			<button type="button" onClick={() => handleQuickSelect('ford', 'Ranger', 'Raptor')}>
				Ford Ranger – Raptor
			</button>

			<form onSubmit={handleSubmit}>
				<select value={make} onChange={handleMakeChange}>
					<option value="">Select Make</option>
					{Object.keys(MODELS).map((m) => (
						<option key={m} value={m}>
						{m.charAt(0).toUpperCase() + m.slice(1)}
						</option>
					))}
				</select>

				<select value={model} onChange={handleModelChange} disabled={!make}>
					<option value="">Select Model</option>
					{modelsForMake.map((mdl) => (
						<option key={mdl} value={mdl}>{mdl}</option>
					))}
				</select>

				<select value={badge} onChange={handleBadgeChange} disabled={!model}>
					<option value="">Select Badge</option>
					{badgesForModel.map((b) => (
						<option key={b} value={b}>{b}</option>
					))}
				</select>

				<div className="form-group">
					<label htmlFor="logbook">Upload Logbook:</label>
					<input id="logbook" ref={fileInputRef}type="file" name="logbook" accept=".txt"
						onChange={(e) => {
							const file = e.target.files[0];
								if (file) {
									if (file.type !== "text/plain") {
										setError("Only .txt files are allowed");
										e.target.value = ""; // clear invalid file
										setFile(null);
									} else {
										setError(null);
										setFile(file);
								}
							}
						}}
					/>
				</div>

				{error && <p style={{color:'red'}}>{error}</p>}

				<button type="submit" disabled={loading}>
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</form>

			{result && (
				<div>
					<h3>Submission Result</h3>
					<p><strong>Make:</strong> {result.vehicle.make}</p>
					<p><strong>Model:</strong> {result.vehicle.model}</p>
					<p><strong>Badge:</strong> {result.vehicle.badge}</p>
					<pre>{result.logbookContent}</pre>
				</div>
			)}
		</div>
	);
};

export default VehicleForm;