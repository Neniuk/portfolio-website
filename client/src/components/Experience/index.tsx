import React, { useState } from "react";
import Pill from "../Pill";

import {
    databaseDesignIntern,
    cloudSoftwareTrainee,
    databaseDesignInternAdvisor,
} from "./experienceInformation";

const ExperienceBody: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const experience = [
        cloudSoftwareTrainee,
        databaseDesignIntern,
        databaseDesignInternAdvisor,
    ];

    const visibleExperience = isExpanded ? experience : experience.slice(0, 2);

    return (
        <div className="flex flex-col gap-3">
            {visibleExperience.map((exp) => (
                <div
                    key={exp.title}
                    className="bg-secondaryColor border-innerBorderColor flex flex-col gap-2 rounded-md border-2 border-solid p-6"
                >
                    <div className="flex flex-row justify-between">
                        <h1>{exp.title}</h1>
                        <p>
                            {exp.startDate} - {exp.endDate}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 pl-6">
                        <div>{exp.description}</div>
                        <div className="flex flex-row flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
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
                {isExpanded ? "Show Less" : "Show More"}
            </button>
        </div>
    );
};

const Experience: React.FC = () => {
    return (
        <div className="bg-primaryColor border-outerBorderColor w-[95%] rounded-md border-2 border-solid p-6 md:w-[600px]">
            <h2 className="text-titleColor mb-6 text-2xl">Experience</h2>
            <ExperienceBody />
        </div>
    );
};

const MemoizedExperience = React.memo(Experience);
export default MemoizedExperience;
