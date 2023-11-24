import React, { Component } from "react";
import "./styles.css";
import starAnimation from "../../assets/star-animation.gif";
import projectInformation from "./projectInformation";

const { exampleProject, hackathon, portfolio, arcade, spotifyDownloader } =
	projectInformation;

const TitleDecoration = () => (
	<img
		className="project-title-decoration"
		src={starAnimation}
		alt="Star animation"
	/>
);

const Project = (props) => (
	<div className="project-card">
		<div className="project">
			<div className="project-title-container">
				<TitleDecoration />
				<a href={props.link} target="_blank" rel="noopener noreferrer">
					<h3>{props.title}</h3>
				</a>
				<TitleDecoration />
			</div>
			<div className="project-description">{props.description}</div>
		</div>
	</div>
);

const ProjectSuggestions = () => (
	<div className="project-suggestions-card">
		<div className="project-suggestions">
			<div className="project-suggestions-title-container">
				<TitleDecoration />
				<div className="project-suggestions-title">
					<h3 className="project-suggestions-main-title">
						Click to suggest project ideas
					</h3>
					<h3>(Under construction)</h3>
				</div>
				<TitleDecoration />
			</div>
		</div>
	</div>
);

class MyProjects extends Component {
	render() {
		return (
			<div className="card">
				<div className="projects">
					<div className="projects-title-container">
						<h1 className="projects-title">Projects</h1>
					</div>
					<div className="projects-container">
						<Project
							title={hackathon.title}
							link={hackathon.link}
							description={hackathon.description}
						/>
						<Project
							title={portfolio.title}
							link={portfolio.link}
							description={portfolio.description}
						/>
						<Project
							title={arcade.title}
							link={arcade.link}
							description={arcade.description}
						/>
						<Project
							title={spotifyDownloader.title}
							link={spotifyDownloader.link}
							description={spotifyDownloader.description}
						/>
						<Project
							title={exampleProject.title}
							link={exampleProject.link}
							description={exampleProject.description}
						/>
						<ProjectSuggestions />
					</div>
				</div>
			</div>
		);
	}
}

export default React.memo(MyProjects);
