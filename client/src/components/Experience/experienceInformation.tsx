import Experience from "../../models/Experience";

const exampleExperience: Experience = {
    title: "Example Experience",
    startDate: "2021",
    endDate: "2021",
    description: (
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            accumsan, metus ultrices eleifend gravida, nulla nunc varius lorem,
            vitae rutrum nisi dolor eget odio. Nullam mollis. Ut justo.
            Suspendisse potenti.
        </p>
    ),
    technologies: ["React", "TypeScript", "Tailwind"],
};

const databaseDesignIntern: Experience = {
    title: "Database Design Intern",
    startDate: "Apr 2023",
    endDate: "Aug 2023",
    description: (
        <p>
            Took part in the design, development, testing, and implementation of
            an internal tool and its database.
        </p>
    ),
    technologies: ["SQL", "VBA", "Python"],
};

const cloudSoftwareTrainee: Experience = {
    title: "Cloud Software Trainee",
    startDate: "May 2024",
    endDate: "Aug 2024",
    description: (
        <p>
            Worked in an agile team developing, fixing, testing & documenting
            both front-end UI components and cloud- native back-end services
            (microservices). Contributed to improving application performance
            and the addition of new features.
        </p>
    ),
    technologies: [
        "TypeScript",
        "Node",
        "Angular",
        "Jest",
        "AWS",
        "Storybook",
        "GitHub Actions",
    ],
};

const databaseDesignInternAdvisor: Experience = {
    title: "Database Design Intern Advisor",
    startDate: "Sep 2024",
    endDate: "Sep 2024",
    description: (
        <p>
            Helped a new intern get familiar with their project and guided them
            on database design basics. Provided feedback on tasks and assisted
            in developing a project plan.
        </p>
    ),
    technologies: [],
};

export {
    exampleExperience,
    databaseDesignIntern,
    cloudSoftwareTrainee,
    databaseDesignInternAdvisor,
};
