import React, { useState } from "react";
import Project from "../../models/Project";
import Pill from "../Pill";

interface CarouselProps {
    projects: Project[];
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
    const [projectIndex, setProjectIndex] = useState(0);

    const nextProject = () => {
        setProjectIndex((projectIndex + 1) % projects.length);
    };

    const prevProject = () => {
        setProjectIndex((projectIndex - 1 + projects.length) % projects.length);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-secondaryColor border-innerBorderColor flex flex-col gap-2 rounded-md border-2 border-solid p-6">
                <div className="mb-2 flex flex-row gap-4">
                    <a
                        href={projects[projectIndex].link}
                        className="project-link"
                    >
                        <h3 className="border-accentSecondaryColor inline-block border-b-2">
                            {projects[projectIndex].title}
                        </h3>
                    </a>
                </div>
                <div className="flex flex-col gap-4 pl-6">
                    <div>{projects[projectIndex].description}</div>
                    <div className="flex flex-row flex-wrap gap-2">
                        {projects[projectIndex].technologies.map((tech) => (
                            <Pill key={tech} text={tech} type="blank" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button onClick={prevProject}>Previous</button>
                <button onClick={nextProject}>Next</button>
            </div>
        </div>
    );
};

export default Carousel;
