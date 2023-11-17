import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";

function App() {
	return (
		<div className="App">
			<h1 className="page-title">NENIUK.DEV</h1>
			<div className="main-column">
				<MyProfile />
				<MyProjects />
				<div className="contact"></div>
				<div className="blog"></div>
			</div>
			<div className="side-column"></div>
		</div>
	);
}

export default App;
