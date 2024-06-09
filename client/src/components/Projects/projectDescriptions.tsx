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
    <ul className="list-outside list-disc">
        <li>
            We built a{" "}
            <strong className="text-titleColorSecondary font-bold">
                dashboard tool
            </strong>{" "}
            with cards of varying information, from summarized news articles, to
            graphed data, and a chatbot.
        </li>
        <br />
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
        <br />
        <li>
            Trustworthiness of the information provided by the LLM was one of
            the key factors of this challenge, and as such we utilized
            techniques such as{" "}
            <strong className="text-titleColorSecondary font-bold">
                prompt engineering
            </strong>{" "}
            and{" "}
            <strong className="text-titleColorSecondary font-bold">
                knowledge bases
            </strong>{" "}
            to help ensure the accuracy of the information and to avoid
            hallucinations (making up non-existent data) by the model.
        </li>
    </ul>
);

// Portfolio Website
export const PortfolioDescription = () => (
    <ul className="list-outside list-disc">
        <li>
            Built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                React.js
            </strong>
            ,{" "}
            <strong className="text-titleColorSecondary font-bold">
                Node.js
            </strong>{" "}
            and{" "}
            <strong className="text-titleColorSecondary font-bold">
                Express.js
            </strong>
            {""}.
        </li>
        <br />
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
    <ul className="list-outside list-disc">
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
    <ul className="list-outside list-disc [&_ul]:list-[revert]">
        <li>
            Fetches the user's playlists and the song names in the selected
            playlist using the{" "}
            <strong className="text-titleColorSecondary font-bold">
                Spotify API
            </strong>
            {""}. Finally all the songs are downloaded and converted to mp3
            using subprocess calls to ffmpeg.
        </li>
        <br />
        <li>
            Simple CLI-tool, built using{" "}
            <strong className="text-titleColorSecondary font-bold">
                Python
            </strong>{" "}
            and various libraries, such as:
            <ul className="inner-list list-outside list-disc pl-6">
                <li>
                    <strong className="text-titleColorSecondary font-bold">
                        requests
                    </strong>{" "}
                    for making the API calls
                </li>
                <li>
                    <strong className="text-titleColorSecondary font-bold">
                        youtubesearchpython
                    </strong>{" "}
                    for searching the songs on YouTube
                </li>
                <li>
                    <strong className="text-titleColorSecondary font-bold">
                        pytube
                    </strong>{" "}
                    for downloading the videos
                </li>
                <li>
                    <strong className="text-titleColorSecondary font-bold">
                        subprocess
                    </strong>{" "}
                    for calling ffmpeg to convert the videos to mp3
                </li>
                <li>
                    And a few others for handling other aspects of the tool.
                </li>
            </ul>
        </li>
    </ul>
);
