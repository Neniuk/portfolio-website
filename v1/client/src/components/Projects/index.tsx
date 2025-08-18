import React, { useState } from "react";

import starAnimation from "../../assets/star-animation.gif";
import {
    hackathon2023,
    hackathon2024,
    portfolio,
    spotifyDownloader,
    kmcPaletteGenerator,
} from "./projectInformation";
import Pill from "../Pill";

const ProjectsBody: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const projects = [
        portfolio,
        spotifyDownloader,
        kmcPaletteGenerator,
        hackathon2024,
        hackathon2023,
    ];

    const visibleProjects = isExpanded ? projects : projects.slice(0, 4);

    return (
        <div className="flex flex-col gap-3">
            {visibleProjects.map((project) => (
                <div
                    key={project.title}
                    className="bg-secondaryColor border-innerBorderColor flex flex-col gap-2 rounded-md border-2 border-solid p-6"
                >
                    <div className="mb-2 flex flex-row gap-4">
                        <img
                            className="h-6 w-6 select-none"
                            src={starAnimation}
                            alt="Star animation"
                            width="24"
                            height="24"
                        />
                        <a href={project.link} className="project-link">
                            <h3 className="border-accentSecondaryColor inline-block border-b-2">
                                {project.title}
                            </h3>
                        </a>
                        <img
                            className="h-6 w-6 select-none"
                            src={starAnimation}
                            alt="Star animation"
                            width="24"
                            height="24"
                        />
                    </div>
                    <div className="flex flex-col gap-4 pl-6">
                        <div>{project.description}</div>
                        <div className="flex flex-row flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <Pill key={tech} text={tech} type="blank" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <button
                className="bg-primaryColor border-outerBorderColor mt-4 rounded-md border-2 border-solid p-2 hover:border-white"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? "⮝ Show Less ⮝" : "⮟ Show More ⮟"}
            </button>
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <div className="bg-primaryColor border-outerBorderColor w-[95%] rounded-md border-2 border-solid p-6 md:w-[600px]">
            <h2 className="text-titleColor mb-6 text-2xl">Projects</h2>
            <ProjectsBody />
        </div>
    );
};

const MemoizedProjects = React.memo(Projects);
export default MemoizedProjects;
