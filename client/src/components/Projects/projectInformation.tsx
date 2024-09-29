import Project from "../../models/Project";
import {
    ExampleProjectDescription,
    HackathonDescription,
    PortfolioDescription,
    ArcadeDescription,
    SpotifyDownloaderDescription,
    KmcPaletteGeneratorDescription,
} from "./projectDescriptions";

const exampleProject: Project = {
    title: "Example Project",
    link: "",
    description: <ExampleProjectDescription />,
};

const hackathon: Project = {
    title: "Junction Hackathon 2023",
    link: "https://github.com/Neniuk/junction-hackathon-2023",
    description: <HackathonDescription />,
};

const portfolio: Project = {
    title: "Portfolio Website",
    link: "https://github.com/Neniuk/portfolio-website",
    description: <PortfolioDescription />,
};

const arcade: Project = {
    title: "Arcade (Under construction)",
    link: "https://github.com/Neniuk/arcade",
    description: <ArcadeDescription />,
};

const spotifyDownloader: Project = {
    title: "Playlist Downloader (CLI)",
    link: "https://github.com/Neniuk/download-playlist",
    description: <SpotifyDownloaderDescription />,
};

const kmcPaletteGenerator: Project = {
    title: "KMC Palette Generator",
    link: "https://github.com/Neniuk/kmc-palette",
    description: <KmcPaletteGeneratorDescription />,
};

export default {
    exampleProject,
    hackathon,
    portfolio,
    arcade,
    spotifyDownloader,
    kmcPaletteGenerator,
};
