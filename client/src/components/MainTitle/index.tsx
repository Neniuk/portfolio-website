import mainTitleDecorationBlue from "../../assets/main-title-decoration-blue.png";

const MainTitle = () => (
    <div className="mb-0 mt-6 flex w-[95%] flex-row items-center justify-center gap-8 overflow-hidden md:mb-6 md:w-full">
        <img
            className="main-title-decoration h-[32px] w-auto max-w-full flex-shrink-0 object-contain brightness-50"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
            width="320"
            height="32"
        />
        <h3 className="text-titleColorSecondary text-center text-3xl">
            NENIUK.DEV
        </h3>
        <img
            className="main-title-decoration h-[32px] w-auto max-w-full flex-shrink-0 rotate-180 object-contain brightness-50"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
            width="320"
            height="32"
        />
    </div>
);

export default MainTitle;
