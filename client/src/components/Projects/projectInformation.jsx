// Example Project
const ExampleProjectDescription = () => (
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
		metus ultrices eleifend gravida, nulla nunc varius lorem, vitae rutrum
		nisi dolor eget odio. Nullam mollis. Ut justo. Suspendisse potenti.
	</p>
);

const exampleProject = {
	title: "Example Project",
	link: "",
	description: <ExampleProjectDescription />,
};

// Junction Hackathon 2023
const HackathonDescription = () => (
	<ul>
		<li>
			We built a <strong className="project-bold">dashboard tool</strong>{" "}
			with cards of varying information, from summarized news articles, to
			graphed data, and a chatbot.
		</li>
		<br />
		<li>
			Built using <strong className="project-bold">Node.js</strong> and{" "}
			<strong className="project-bold">Express.js</strong>, utilizing a
			few different LLMs and tools for managing and running these models,
			such as <strong className="project-bold">Ollama.ai</strong>.
		</li>
		<br />
		<li>
			Trustworthiness of the information provided by the LLM was one of
			the key factors of this challenge, and as such we utilized
			techniques such as{" "}
			<strong className="project-bold">prompt engineering</strong> and{" "}
			<strong className="project-bold">knowledge bases</strong> to help
			ensure the accuracy of the information and to avoid hallucinations
			(making up non-existent data) by the model.
		</li>
	</ul>
);

const hackathon = {
	title: "Junction Hackathon 2023",
	link: "https://github.com/Neniuk/junction-hackathon-2023",
	description: <HackathonDescription />,
};

// Portfolio Website
const PortfolioDescription = () => (
	<ul>
		<li>
			Built using <strong className="project-bold">React.js</strong>,{" "}
			<strong className="project-bold">Node.js</strong> and{" "}
			<strong className="project-bold">Express.js</strong>.
		</li>
		{/* <br />
		<li>
			The backend uses the Express server and contains{" "}
			<strong className="project-bold">API endpoints</strong> for sending
			chat messages and for signing the guestbook.
		</li> */}
		<br />
		<li>
			The <strong className="project-bold">chat</strong> works through{" "}
			<strong className="project-bold">WebSockets</strong> using{" "}
			<strong className="project-bold">Socket.io</strong>. The sent
			messages are filtered and then broadcasted to all connected clients.
		</li>
	</ul>
);

const portfolio = {
	title: "Portfolio Website",
	link: "https://github.com/Neniuk/portfolio-website",
	description: <PortfolioDescription />,
};

// Arcade
const ArcadeDescription = () => (
	<ul>
		<li>
			Collection of games built using technologies such as{" "}
			<strong className="project-bold">Phaser.io</strong>,{" "}
			<strong className="project-bold">WebGL</strong> and{" "}
			<strong className="project-bold">Web Workers</strong>.
		</li>
	</ul>
);

const arcade = {
	title: "Arcade (Under construction)",
	link: "https://github.com/Neniuk/arcade",
	description: <ArcadeDescription />,
};

// Spotify Downloader
const SpotifyDownloaderDescription = () => (
	<ul>
		<li>
			Fetches the user's playlists and the song names in the selected
			playlist using the{" "}
			<strong className="project-bold">Spotify API</strong>.
		</li>
		<br />
		<li>
			Simple CLI-tool, built using{" "}
			<strong className="project-bold">Python</strong> and various
			libraries, such as:
			<ul className="inner-list">
				<li>
					<strong className="project-bold">requests</strong> for
					making the API calls
				</li>
				<li>
					<strong className="project-bold">
						youtubesearchpython
					</strong>{" "}
					for searching the songs on YouTube
				</li>
				<li>
					<strong className="project-bold">pytube</strong> for
					downloading the videos
				</li>
				<li>
					<strong className="project-bold">subprocess</strong> for
					calling ffmpeg to convert the videos to mp3
				</li>
				<li>
					And a few others for handling other aspects of the tool.
				</li>
			</ul>
		</li>
	</ul>
);

const spotifyDownloader = {
	title: "Spotify Playlist Downloader (CLI)",
	link: "https://github.com/Neniuk/download-playlist",
	description: <SpotifyDownloaderDescription />,
};

export default {
	exampleProject,
	hackathon,
	portfolio,
	arcade,
	spotifyDownloader,
};
