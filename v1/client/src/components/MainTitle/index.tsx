import React, { useEffect, useState } from "react";

import mainTitleDecorationBlue from "../../assets/main-title-decoration-blue.png";

const MainTitle: React.FC = () => {
    const [mainTitleIsLoading, setMainTitleIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = mainTitleDecorationBlue;
        img.onload = () => setMainTitleIsLoading(false);
    }, []);

    return (
        <div className="mt-6 mb-0 flex w-[95%] flex-row items-center justify-center gap-8 overflow-hidden md:mb-6 md:w-full">
            {mainTitleIsLoading ? (
                <div className="h-[32px] w-[320px]"></div>
            ) : (
                <img
                    className="main-title-decoration h-[32px] w-auto max-w-full flex-shrink-0 object-contain brightness-50 select-none"
                    src={mainTitleDecorationBlue}
                    alt="Main title decoration"
                    width="320"
                    height="32"
                />
            )}
            <h3 className="text-titleColorSecondary text-center text-3xl">
                NENIUK.DEV
            </h3>
            {mainTitleIsLoading ? (
                <div className="h-[32px] w-[320px]"></div>
            ) : (
                <img
                    className="main-title-decoration h-[32px] w-auto max-w-full flex-shrink-0 rotate-180 object-contain brightness-50 select-none"
                    src={mainTitleDecorationBlue}
                    alt="Main title decoration"
                    width="320"
                    height="32"
                />
            )}
        </div>
    );
};

export default MainTitle;
