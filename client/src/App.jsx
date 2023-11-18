import MyProfile from "./components/Profile";
import MyProjects from "./components/Projects";
import MyChat from "./components/Chat";

function App() {
	return (
		<div className="App">
			<h1 className="page-title">NENIUK.DEV</h1>
			<div className="page-content-table">
				<div className="left-side-column"></div>
				<div className="main-column">
					<MyProfile />
					<MyProjects />
					<div className="contact"></div>
					<div className="blog"></div>
				</div>
				<div className="right-side-column">
					<MyChat />
				</div>
			</div>
		</div>
	);
}

export default App;
