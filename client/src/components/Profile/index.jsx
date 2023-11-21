import React, { Component } from "react";
import "./styles.css";
import profilePicture from "../../assets/profile-picture-2.png";

import githubLogo from "../../assets/github-logo.png";
import linkedInLogo from "../../assets/linkedin-logo.png";

const githubLink = "https://github.com/Neniuk";
const linkedInLink = "https://www.linkedin.com/in/mattiasvslotte/";

const profileName = "Mattias";

const ProfileDescription = () => (
	<p>
		Hi, I'm Mattias, a second-year bachelor's student in software
		engineering. I'm currently looking for a summer job or an internship for
		the summer of 2024. I'm also open to part-time work during the school
		year. If you have any questions, feel free to contact me via email or
		LinkedIn.
	</p>
);

const LoremDescription = () => (
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
		metus ultrices eleifend gravida, nulla nunc varius lorem, vitae rutrum
		nisi dolor eget odio. Nullam mollis. Ut justo. Suspendisse potenti.
	</p>
);

const ProfilePicture = () => (
	<div className="profile-picture-container">
		<img
			className="profile-picture"
			src={profilePicture}
			alt="Profile picture"
		/>
	</div>
);

const TextContent = () => (
	<div className="profile-text-content">
		<div className="profile-name">
			<h1>{profileName}</h1>
		</div>
		<div className="profile-description">
			<ProfileDescription />
		</div>
	</div>
);

const SocialLinks = () => (
	<div className="social-links">
		<a href={githubLink} target="_blank" rel="noopener noreferrer">
			<img className="social-logo" src={githubLogo} alt="Github logo" />
		</a>
		<a href={linkedInLink} target="_blank" rel="noopener noreferrer">
			<img
				className="social-logo"
				src={linkedInLogo}
				alt="LinkedIn logo"
			/>
		</a>
	</div>
);

class MyProfile extends Component {
	render() {
		return (
			<div className="card">
				<div className="profile">
					<div className="profile-content">
						<ProfilePicture />
						<div className="profile-details-container">
							<TextContent />
							<SocialLinks />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default React.memo(MyProfile);
