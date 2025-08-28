import React, { useEffect, useState } from "react";
import "./styles.css";

import profilePicture from "../../assets/profile-picture-2.png";
import githubLogo from "../../assets/github-logo.png";
import linkedInLogo from "../../assets/linkedin-logo.png";
import locationPin from "../../assets/location-pin.png";

const githubLink = "https://github.com/neniuk";
const linkedInLink = "https://www.linkedin.com/in/mattiasvslotte/";

const ProfilePicture: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = profilePicture;
        img.onload = () => setIsLoading(false);
    }, []);

    return (
        <div className="pfp-container border-accentColor mr-2 h-[200px] w-[180px] rounded-3xl border-2 border-solid">
            {isLoading ? (
                <div className="h-full w-full rounded-3xl bg-gray-800"></div>
            ) : (
                <img
                    className="h-full w-full select-none rounded-3xl object-cover"
                    style={{
                        filter: "contrast(0.9) saturate(1.5) sepia(0.3) brightness(0.9)",
                    }}
                    src={profilePicture}
                    alt="Pixel art self portrait"
                    width="180"
                    height="200"
                />
            )}
        </div>
    );
};

const ProfileTitle: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-1 md:items-start">
        <h1 className="text-6xl">Mattias</h1>
        <div className="flex flex-row items-center gap-2">
            <img
                className="h-auto w-[12px] select-none"
                src={locationPin}
                alt="Location pin"
                width="12"
                height="21"
            />
            <p className="text-lg text-gray-400">Finland</p>
        </div>
    </div>
);

const ProfileSummary: React.FC = () => (
    <div>
        <p>
            Hi, I'm a master's student in computer science. If you have any
            questions, feel free to contact me via LinkedIn.
        </p>
    </div>
);

const SocialLinks: React.FC = () => {
    const [githubLoading, setGithubLoading] = useState(true);
    const [linkedInLoading, setLinkedInLoading] = useState(true);

    useEffect(() => {
        const githubImg = new Image();
        githubImg.src = githubLogo;
        githubImg.onload = () => setGithubLoading(false);

        const linkedInImg = new Image();
        linkedInImg.src = linkedInLogo;
        linkedInImg.onload = () => setLinkedInLoading(false);
    }, []);

    return (
        <div className="flex flex-row gap-4">
            <a
                className="select-none"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {githubLoading ? (
                    <div className="w-32px h-32px rounded-full bg-gray-200"></div>
                ) : (
                    <img
                        className="w-32px hover:animate-spin-slow h-auto hover:brightness-75"
                        src={githubLogo}
                        alt="Github logo"
                        width="32"
                        height="32"
                    />
                )}
            </a>
            <a
                className="select-none"
                href={linkedInLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {linkedInLoading ? (
                    <div className="w-32px h-32px rounded-full bg-gray-200"></div>
                ) : (
                    <img
                        className="w-32px hover:animate-spin-slow h-auto hover:brightness-75"
                        src={linkedInLogo}
                        alt="LinkedIn logo"
                        width="32"
                        height="32"
                    />
                )}
            </a>
        </div>
    );
};

const Profile: React.FC = () => {
    return (
        <div className="border-outerBorderColor bg-primaryColor flex w-[95%] flex-col items-center justify-center gap-4 rounded-md border-2 border-solid p-6 md:w-[600px] md:flex-row">
            <ProfilePicture />
            <div className="max-w-95% flex flex-col items-center gap-4 text-center md:max-w-[60%] md:items-start md:text-start">
                <ProfileTitle />
                <ProfileSummary />
                <SocialLinks />
            </div>
        </div>
    );
};

const MemoizedProfile = React.memo(Profile);
export default MemoizedProfile;
