import React, { useState, useEffect } from "react";
import "./styles.css";

// Assets
import sunImage from "../../assets/sun.png";
import moonImage from "../../assets/moon.png";

const UPDATE_INTERVAL: number = 60000;
const SUN_SIZE: number = 38;
const MOON_SIZE: number = 44;

const SunMoonCycle: React.FC = () => {
    const getFormattedCurrentTime = (): string => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    const calculatePositionPercentage = (): number => {
        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        return (totalMinutes / (24 * 60)) * 100;
    };

    const [cycleState, setCycleState] = useState({
        positionPercentage: 0,
        currentTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
        isDaytime: true,
    });
    const [formattedCurrentTime, setFormattedCurrentTime] = useState<string>(
        getFormattedCurrentTime()
    );

    useEffect(() => {
        const updateCycleState = () => {
            const positionPercentage: number = calculatePositionPercentage();
            const currentTime: string = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            const isDaytime: boolean =
                new Date().getHours() >= 6 && new Date().getHours() < 21;
            setCycleState({
                positionPercentage: positionPercentage,
                currentTime: currentTime,
                isDaytime: isDaytime,
            });
        };

        updateCycleState();
        const intervalId = setInterval(updateCycleState, UPDATE_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const updateFormattedCurrentTime = () => {
            setFormattedCurrentTime(getFormattedCurrentTime());
        };

        const now = new Date();
        const delay = 1000 - now.getMilliseconds();

        const timeoutId = setTimeout(() => {
            updateFormattedCurrentTime();
            const intervalId = setInterval(updateFormattedCurrentTime, 1000);
            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="border-outerBorderColor bg-primaryColor flex w-[95%] flex-row items-center justify-center gap-4 overflow-hidden rounded-md border-2 border-solid p-6 md:w-[600px] md:flex-row">
            {/* Time now */}
            <p>{formattedCurrentTime}</p>
            {/* Sun/Moon cycle */}
            <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-blue-900 via-yellow-500 to-indigo-900">
                <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                        // Ensure the sun/moon is centered on the current time
                        left: `calc(${cycleState.positionPercentage}% - ${
                            cycleState.isDaytime ? SUN_SIZE / 2 : MOON_SIZE / 2
                        }px)`,
                        // Set the size of the sun/moon
                        width: `${
                            cycleState.isDaytime ? SUN_SIZE : MOON_SIZE
                        }px`,
                        height: `${
                            cycleState.isDaytime ? SUN_SIZE : MOON_SIZE
                        }px`,
                    }}
                >
                    <img
                        src={cycleState.isDaytime ? sunImage : moonImage}
                        alt={cycleState.isDaytime ? "Sun" : "Moon"}
                        title={cycleState.isDaytime ? "Sun" : "Moon"}
                        className="sun-moon-cycle-image"
                        style={{
                            width: "100%",
                            height: "auto",
                            filter: cycleState.isDaytime
                                ? "drop-shadow(0 0 10px yellow)"
                                : "drop-shadow(0 0 10px lightblue)",
                        }}
                        width={cycleState.isDaytime ? SUN_SIZE : MOON_SIZE}
                        height={cycleState.isDaytime ? SUN_SIZE : MOON_SIZE}
                    />
                </div>
            </div>
        </div>
    );
};

const MemoizedSunMoonCycle = React.memo(SunMoonCycle);
export default MemoizedSunMoonCycle;
