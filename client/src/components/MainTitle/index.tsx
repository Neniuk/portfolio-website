import mainTitleDecorationBlue from "../../assets/main-title-decoration-blue.png";

const MainTitle = () => (
    <div className="mb-0 mt-6 flex w-[95%] flex-row items-center justify-center gap-8 md:mb-6 md:w-full">
        <img
            className="main-title-decoration h-[32px] w-[95%] brightness-50 md:w-[320px]"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
        />
        <h3 className="text-titleColorSecondary text-center text-3xl">
            NENIUK.DEV
        </h3>
        <img
            className="main-title-decoration h-[32px] w-[95%] rotate-180 brightness-50 md:w-[320px]"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
        />
    </div>
);

export default MainTitle;
