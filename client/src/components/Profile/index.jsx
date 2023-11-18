import React, { Component } from "react";
import "./styles.css";
import profilePicture from "../../assets/profile-picture.png";

import githubLogo from "../../assets/github-logo.png";
import linkedInLogo from "../../assets/linkedin-logo.png";

const githubLink = "https://github.com/Neniuk";
const linkedInLink = "https://www.linkedin.com/in/mattiasvslotte/";

const profileName = "Mattias";

const ProfileDescription = () => (
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
