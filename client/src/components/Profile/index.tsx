import React, { Component } from "react";

import Card from "../StyleComponents/Card";

import profilePicture from "../../assets/profile-picture-2.png";
import githubLogo from "../../assets/github-logo.png";
import linkedInLogo from "../../assets/linkedin-logo.png";

const githubLink = "https://github.com/Neniuk";
const linkedInLink = "https://www.linkedin.com/in/mattiasvslotte/";

const ProfilePicture = () => (
    <div>
        <img
            className="w-200px border-titleColorPrimary h-auto rounded-lg border-2"
            src={profilePicture}
            alt="Profile picture"
        />
    </div>
);

const ProfileTitle = () => (
    <div className="text-6xl">
        <h1>Mattias</h1>
    </div>
);

const TextContent = () => (
    <div>
        <p>
            Hi, I'm Mattias, a second-year bachelor's student in software
            engineering. I'm currently looking for a summer job or an internship
            for the summer of 2024. I'm also open to part-time work during the
            school year. If you have any questions, feel free to contact me via
            email or LinkedIn.
        </p>
    </div>
);

const SocialLinks = () => (
    <div className="flex flex-row gap-4">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <img
                className="w-32px h-auto hover:animate-spin hover:brightness-75"
                src={githubLogo}
                alt="Github logo"
            />
        </a>
        <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
            <img
                className="w-32px h-auto hover:animate-spin hover:brightness-75"
                src={linkedInLogo}
                alt="LinkedIn logo"
            />
        </a>
    </div>
);

const ProfileBody = () => (
    <div className="flex flex-row gap-4">
        <ProfilePicture />
        <div className="flex flex-col gap-4">
            <ProfileTitle />
            <TextContent />
            <SocialLinks />
        </div>
    </div>
);

class MyProfile extends Component {
    render() {
        return <Card headerInclude={false} bodyContent={<ProfileBody />} />;
    }
}

export default React.memo(MyProfile);
