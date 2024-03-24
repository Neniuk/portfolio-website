import React, { Component } from "react";
import "./styles.css";

import Card from "../StyleComponents/Card";
import DecoratedTitle from "../StyleComponents/DecoratedTitle";

import starAnimation from "../../assets/star-animation.gif";
import projectInformation from "./projectInformation";

const {
    //exampleProject,
    hackathon,
    portfolio,
    arcade,
    spotifyDownloader,
} = projectInformation;

const DecoratedProjectTitle = ({
    title,
    hasLink,
    link,
}: {
    title: string;
    hasLink: boolean;
    link: string;
}) => (
    <DecoratedTitle
        title={title}
        decoration={starAnimation}
        decorationAlt="Star animation"
        decorationWidth="1.5rem"
        decorationHeight="1.5rem"
        hasLink={hasLink}
        link={link}
    />
);

const ProjectTitle = ({ title, link }: { title: string; link: string }) => (
    <div>
        <img src={starAnimation} alt="Star animation" />
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="decorated-title-link"
        >
            <h3 className="project-title">{title}</h3>
        </a>
    </div>
);

const TitleDecoration = () => (
    <img
        className="project-title-decoration"
        src={starAnimation}
        alt="Star animation"
    />
);

const ProjectSuggestions = () => (
    <div className="project-suggestions-card">
        <div className="project-suggestions">
            <div className="project-suggestions-title-container">
                <TitleDecoration />
                <div className="project-suggestions-title font-bold">
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

const ProjectBody = ({ description }: { description: React.JSX.Element }) => (
    <div className="project-description">{description}</div>
);

const ProjectsBody = () => (
    <div className="projects-container">
        <Card
            headerInclude={true}
            headerContent={
                <DecoratedProjectTitle
                    title={hackathon.title}
                    hasLink={true}
                    link={hackathon.link}
                />
            }
            bodyContent={<ProjectBody description={hackathon.description} />}
            innerCard={true}
        />
        <Card
            headerInclude={true}
            headerContent={
                <DecoratedProjectTitle
                    title={portfolio.title}
                    hasLink={true}
                    link={portfolio.link}
                />
            }
            bodyContent={<ProjectBody description={portfolio.description} />}
            innerCard={true}
        />
        <Card
            headerInclude={true}
            headerContent={
                <DecoratedProjectTitle
                    title={arcade.title}
                    hasLink={true}
                    link={arcade.link}
                />
            }
            bodyContent={<ProjectBody description={arcade.description} />}
            innerCard={true}
        />
        <Card
            headerInclude={true}
            headerContent={
                <DecoratedProjectTitle
                    title={spotifyDownloader.title}
                    hasLink={true}
                    link={spotifyDownloader.link}
                />
            }
            bodyContent={
                <ProjectBody description={spotifyDownloader.description} />
            }
            innerCard={true}
        />
        {/* <Card
			headerInclude={true}
			headerContent={
				<DecoratedProjectTitle title={exampleProject.title} />
			}
			bodyContent={<ProjectBody description={exampleProject.description} />}
			innerCard={true}
		/> */}
        <ProjectSuggestions />
    </div>
);

class MyProjects extends Component {
    render() {
        return (
            <Card
                headerInclude={true}
                headerContent={<h1 className="projects-title">Projects</h1>}
                bodyContent={<ProjectsBody />}
            />
        );
    }
}

export default React.memo(MyProjects);
