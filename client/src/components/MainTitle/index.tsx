import mainTitleDecorationBlue from "../../assets/main-title-decoration-blue.png";

const MainTitle = () => (
    <div className="mb-6 mt-24 flex flex-row items-center justify-center gap-8">
        <img
            className="main-title-decoration"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
            style={{
                width: "320px",
                height: "32px",
            }}
        />
        <h3 className="text-titleColorSecondary text-center text-3xl">
            NENIUK.DEV
        </h3>
        <img
            className="main-title-decoration rotate-180"
            src={mainTitleDecorationBlue}
            alt="Main title decoration"
            style={{
                width: "320px",
                height: "32px",
            }}
        />
    </div>
);

export default MainTitle;
