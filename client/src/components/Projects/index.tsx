import React from "react";
import "./styles.css";

import starAnimation from "../../assets/star-animation.gif";
import projectInformation from "./projectInformation";

const {
    //exampleProject,
    hackathon,
    portfolio,
    arcade,
    spotifyDownloader,
} = projectInformation;

const ProjectSuggestions: React.FC = () => (
    <div className="bg-secondaryColor border-innerBorderColor flex flex-row items-center justify-center border-2 border-solid p-10">
        <img className="h-6 w-6" src={starAnimation} alt="Star animation" />
        <div className="mx-6 flex flex-col items-center text-center font-bold">
            <h3 className="text-titleColorSecondary">
                Click to suggest project ideas
            </h3>
            <h3 className="text-titleColorSecondary">(Under construction)</h3>
        </div>
        <img className="h-6 w-6" src={starAnimation} alt="Star animation" />
    </div>
);

const ProjectsBody: React.FC = () => {
    const projects = [hackathon, portfolio, arcade, spotifyDownloader];
    return (
        <div className="flex flex-col gap-3">
            {projects.map((project) => (
                <div
                    key={project.title}
                    className="bg-secondaryColor border-innerBorderColor flex flex-col rounded-md border-2 border-solid p-6"
                >
                    <div className="mb-2 flex flex-row gap-4">
                        <img
                            className="h-6 w-6"
                            src={starAnimation}
                            alt="Star animation"
                        />
                        <a href={project.link} className="project-link">
                            <h3 className="border-accentSecondaryColor inline-block border-b-2">
                                {project.title}
                            </h3>
                        </a>
                        <img
                            className="h-6 w-6"
                            src={starAnimation}
                            alt="Star animation"
                        />
                    </div>
                    <div className="project-description">
                        {project.description}
                    </div>
                </div>
            ))}
            <ProjectSuggestions />
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <div className="bg-primaryColor border-outerBorderColor w-[95%] rounded-md border-2 border-solid p-6 sm:w-[600px]">
            <h2 className="text-titleColor mb-6 text-2xl">Projects</h2>
            <ProjectsBody />
        </div>
    );
};

const MemoizedProjects = React.memo(Projects);
export default MemoizedProjects;
