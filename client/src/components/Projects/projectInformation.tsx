import Project from "../../models/Project";

const exampleProject: Project = {
    title: "Example Project",
    link: "",
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

const hackathon2023: Project = {
    title: "Junction Hackathon 2023",
    link: "https://github.com/neniuk/junction-hackathon-2023",
    description: (
        <p>
            Dashboard tool with cards of varying information, from summarized
            news articles to graphed data and a chatbot. Utilized various LLMs
            and tools for managing and running these models, such as Ollama.ai.
        </p>
    ),
    technologies: ["JavaScript", "Node", "Express", "Ollama.ai"],
};

const hackathon2024: Project = {
    title: "Junction Hackathon 2024",
    link: "https://github.com/DucLUT/Junction_2024",
    description: (
        <p>
            A tool to semi-automatically create 3D-models, building information
            models (BIM), out of 2D building floor plans. Uses React and
            Three.js for the front-end to construct, display and manipulate the
            BIMs, as well as Python and OpenCV for the back-end, to extract
            walls from the floor plan.
        </p>
    ),
    technologies: ["TypeScript", "React", "Three.js", "Python", "OpenCV"],
};

const portfolio: Project = {
    title: "Portfolio Website",
    link: "https://github.com/neniuk/portfolio",
    description: (
        <p>
            A personal portfolio website showcasing projects and skills, with a
            real-time chat feature.
        </p>
    ),
    technologies: [
        "TypeScript",
        "React",
        "Node",
        "Express",
        "Socket.io",
        "Tailwind",
    ],
};

const arcade: Project = {
    title: "Arcade (Under construction)",
    link: "https://github.com/neniuk/arcade",
    description: (
        <p>Collection of games built using various web technologies.</p>
    ),
    technologies: ["TypeScript", "Phaser.io"],
};

const spotifyDownloader: Project = {
    title: "Playlist Downloader (CLI)",
    link: "https://github.com/neniuk/download-playlist",
    description: (
        <p>
            A simple CLI-tool that fetches the user's playlists and the song
            names in the selected playlist using the Spotify API.
        </p>
    ),
    technologies: ["Python"],
};

const kmcPaletteGenerator: Project = {
    title: "KMC Palette Generator",
    link: "https://github.com/neniuk/kmc-palette",
    description: (
        <p>Generates a color palette from an image using K-Means Clustering.</p>
    ),
    technologies: ["Go"],
};

export {
    exampleProject,
    hackathon2023,
    hackathon2024,
    portfolio,
    arcade,
    spotifyDownloader,
    kmcPaletteGenerator,
};
