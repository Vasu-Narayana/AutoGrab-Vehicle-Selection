import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleForm from "./components/VehicleForm";
import Upload from "./components/Upload";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<VehicleForm />} />
				<Route path="/upload" element={<Upload />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;