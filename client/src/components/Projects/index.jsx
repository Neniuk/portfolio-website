import React, { Component } from "react";
import "./styles.css";
import starAnimation from "../../assets/star-animation.gif";

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

const hackathonLink = "https://github.com/Neniuk/junction-hackathon-2023";
const HackathonDescription = () => (
	<ul>
		<li>
			We built a <strong className="project-bold">dashboard tool</strong>{" "}
			with cards of varying information, from summarized news articles, to
			graphed data, and a chatbot.
		</li>
		<br />
		<li>
			Built using <strong className="project-bold">Node.js</strong> and{" "}
			<strong className="project-bold">Express.js</strong>, utilizing a
			few different LLMs and tools for managing and running these models,
			such as <strong className="project-bold">Ollama.ai</strong>.
		</li>
		<br />
		<li>
			Trustworthiness of the information provided by the LLM was one of
			the key factors of this challenge, and as such we utilized
			techniques such as{" "}
			<strong className="project-bold">prompt engineering</strong> and{" "}
			<strong className="project-bold">knowledge bases</strong> to help
			ensure the accuracy of the information and to avoid hallucinations
			(making up non-existent data) by the model.
		</li>
	</ul>
);

const portfolioLink = "https://github.com/Neniuk/portfolio-website";
const PortfolioDescription = () => (
	<ul>
		<li>
			Built using <strong className="project-bold">React.js</strong>,{" "}
			<strong className="project-bold">Node.js</strong> and{" "}
			<strong className="project-bold">Express.js</strong>.
		</li>
		<br />
		<li>
			The backend uses the Express server and contains{" "}
			<strong className="project-bold">API endpoints</strong> for sending
			chat messages and for signing the guestbook.
		</li>
		<br />
		<li>
			The <strong className="project-bold">chat</strong> works through{" "}
			<strong className="project-bold">WebSockets</strong> using{" "}
			<strong className="project-bold">Socket.io</strong>. The sent
			messages are filtered and then broadcasted to all connected clients.
		</li>
	</ul>
);

const arcadeLink = "https://github.com/Neniuk/arcade";
const ArcadeDescription = () => (
	<ul>
		<li>
			The games are built using technologies such as{" "}
			<strong className="project-bold">Phaser.io</strong>,{" "}
			<strong className="project-bold">WebGL</strong> and{" "}
			<strong className="project-bold">Web Workers</strong>.
		</li>
	</ul>
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
							title="Hackathon - Junction 2023"
							link={hackathonLink}
							description={<HackathonDescription />}
						/>
						<Project
							title="Portfolio Website"
							link={portfolioLink}
							description={<PortfolioDescription />}
						/>
						<Project
							title="Arcade (Under construction)"
							link={arcadeLink}
							description={<ArcadeDescription />}
						/>
						<Project
							title="Project 4"
							description="Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nulla accumsan, metus ultrices
                                eleifend gravida, nulla nunc varius lorem, vitae
                                rutrum nisi dolor eget odio. Nullam mollis. Ut
                                justo. Suspendisse potenti."
						/>
						<ProjectSuggestions />
					</div>
				</div>
			</div>
		);
	}
}

export default React.memo(MyProjects);
