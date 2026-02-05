import{render,screen}from"@testing-library/react";
import{BrowserRouter}from"react-router-dom";
import VehicleForm from"../components/VehicleForm";

test("renders heading",()=> {
	render(<BrowserRouter>
		<VehicleForm/> </BrowserRouter>);
		expect(screen.getByText(/Vehicle Selection/i)).toBeInTheDocument();
	});