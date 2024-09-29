// Example Project
export const ExampleProjectDescription = () => (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
        metus ultrices eleifend gravida, nulla nunc varius lorem, vitae rutrum
        nisi dolor eget odio. Nullam mollis. Ut justo. Suspendisse potenti.
    </p>
);

// Junction Hackathon 2023
export const HackathonDescription = () => (
    <ul className="list-outside list-disc [&>li:last-child]:mb-0 [&>li]:mb-6">
        <li>
            We built a{" "}
            <strong className="text-titleColorSecondary font-bold">
                dashboard tool
            </strong>{" "}
            with cards of varying information, from summarized news articles, to
            graphed data, and a chatbot.
        </li>
        <li>
            Built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                Node.js
            </strong>{" "}
            and{" "}
            <strong className="text-titleColorSecondary font-bold">
                Express.js
            </strong>
            , utilizing a few different LLMs and tools for managing and running
            these models, such as{" "}
            <strong className="text-titleColorSecondary font-bold">
                Ollama.ai
            </strong>
            {""}.
        </li>
    </ul>
);

// Portfolio Website
export const PortfolioDescription = () => (
    <ul className="list-outside list-disc [&>li:last-child]:mb-0 [&>li]:mb-6">
        <li>
            Built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                React.js
            </strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">Vite</strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">
                TailwindCSS
            </strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">
                Node.js
            </strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">
                Express.js
            </strong>{" "}
            and{" "}
            <strong className="text-titleColorSecondary font-bold">
                Socket.io
            </strong>
        </li>
        <li>
            The{" "}
            <strong className="text-titleColorSecondary font-bold">chat</strong>{" "}
            works through{" "}
            <strong className="text-titleColorSecondary font-bold">
                WebSockets
            </strong>{" "}
            using{" "}
            <strong className="text-titleColorSecondary font-bold">
                Socket.io
            </strong>
            {""}. The sent messages are filtered and then broadcasted to all
            connected clients.
        </li>
    </ul>
);

// Arcade
export const ArcadeDescription = () => (
    <ul className="list-outside list-disc [&>li:last-child]:mb-0 [&>li]:mb-6">
        <li>
            Collection of games built using technologies such as{" "}
            <strong className="text-titleColorSecondary font-bold">
                Phaser.io
            </strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">
                WebGL
            </strong>{" "}
            and{" "}
            <strong className="text-titleColorSecondary font-bold">
                Web Workers
            </strong>
            {""}.
        </li>
    </ul>
);

// Spotify Downloader
export const SpotifyDownloaderDescription = () => (
    <ul className="list-outside list-disc [&>li:last-child]:mb-0 [&>li]:mb-6 [&_ul]:list-[revert]">
        <li>
            Fetches the user's playlists and the song names in the selected
            playlist using the{" "}
            <strong className="text-titleColorSecondary font-bold">
                Spotify API
            </strong>
            {""}. Finally all the songs are downloaded and converted to mp3
            using subprocess calls to ffmpeg. Simple CLI-tool, built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                Python
            </strong>{" "}
            and various libraries.
        </li>
    </ul>
);

// K-Means Clustering Palette Generator
export const KmcPaletteGeneratorDescription = () => (
    <ul className="list-outside list-disc [&>li:last-child]:mb-0 [&>li]:mb-6">
        <li>
            Generates a color palette from an image using{" "}
            <strong className="text-titleColorSecondary font-bold">
                K-Means Clustering
            </strong>
            {""}. Built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                GoLang.
            </strong>
        </li>
    </ul>
);
