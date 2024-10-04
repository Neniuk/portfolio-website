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

const hackathon: Project = {
    title: "Junction Hackathon 2023",
    link: "https://github.com/Neniuk/junction-hackathon-2023",
    description: (
        <p>
            Dashboard tool with cards of varying information, from summarized
            news articles to graphed data and a chatbot. Utilized various LLMs
            and tools for managing and running these models, such as Ollama.ai.
        </p>
    ),
    technologies: ["JavaScript", "Node", "Express", "Ollama.ai"],
};

const portfolio: Project = {
    title: "Portfolio Website",
    link: "https://github.com/Neniuk/portfolio-website",
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
    link: "https://github.com/Neniuk/arcade",
    description: (
        <p>Collection of games built using various web technologies.</p>
    ),
    technologies: ["TypeScript", "Phaser.io"],
};

const spotifyDownloader: Project = {
    title: "Playlist Downloader (CLI)",
    link: "https://github.com/Neniuk/download-playlist",
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
    link: "https://github.com/Neniuk/kmc-palette",
    description: (
        <p>Generates a color palette from an image using K-Means Clustering.</p>
    ),
    technologies: ["Go"],
};

export {
    exampleProject,
    hackathon,
    portfolio,
    arcade,
    spotifyDownloader,
    kmcPaletteGenerator,
};
