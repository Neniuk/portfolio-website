import React from "react";

import profilePicture from "../../assets/profile-picture-2.png";
import githubLogo from "../../assets/github-logo.png";
import linkedInLogo from "../../assets/linkedin-logo.png";

const githubLink = "https://github.com/Neniuk";
const linkedInLink = "https://www.linkedin.com/in/mattiasvslotte/";

const ProfilePicture: React.FC = () => (
    <div
        className="border-accentColor mr-2 h-[200px] w-[180px] rounded-3xl border-2 border-solid"
        style={{
            background:
                "radial-gradient(circle at center, transparent, black 80%)",
        }}
    >
        <img
            className="h-full w-full rounded-3xl object-cover"
            style={{
                filter: "contrast(0.9) saturate(1.5) sepia(0.3) brightness(0.9)",
            }}
            src={profilePicture}
            alt="Pixel art self portrait"
        />
    </div>
);

const ProfileTitle: React.FC = () => (
    <div className="text-6xl">
        <h1>Mattias</h1>
    </div>
);

const ProfileSummary: React.FC = () => (
    <div>
        <p>
            Hi, I'm Mattias, a second-year bachelor's student in software
            engineering. I'm currently working as a cloud software trainee. If
            you have any questions, feel free to contact me via email or
            LinkedIn.
        </p>
    </div>
);

const SocialLinks: React.FC = () => (
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

const Profile: React.FC = () => {
    return (
        <div className="border-outerBorderColor bg-primaryColor flex w-[95%] flex-col items-center justify-center gap-4 rounded-md border-2 border-solid p-6 sm:w-[600px] sm:flex-row">
            <ProfilePicture />
            <div className="max-w-95% flex flex-col items-center gap-4 text-center sm:max-w-[60%] sm:items-start sm:text-start">
                <ProfileTitle />
                <ProfileSummary />
                <SocialLinks />
            </div>
        </div>
    );
};

const MemoizedProfile = React.memo(Profile);
export default MemoizedProfile;
