import React, { Component } from "react";
import "./styles.css";
import profilePicture from "../../assets/profile-picture.png";

const profileName = "Mattias";
const profileDescription =
	"Hello, I'm Mattias. I'm a software developer with a passion for learning new technologies. In my free time, I enjoy hiking, reading, and exploring new places.";

class MyProfile extends Component {
	render() {
		return (
			<div className="card">
				<div className="profile">
					<div className="profile-content">
						<div className="profile-picture-container">
							<img
								className="profile-picture"
								src={profilePicture}
								alt="Profile picture"
							/>
						</div>
						<div className="name-description-container">
							<div className="profile-name">
								<h1>{profileName}</h1>
							</div>
							<div className="profile-description">
								<p>{profileDescription}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyProfile;
