import React, { useState, useEffect } from "react";
import "./styles.css";

// Assets
import sunImage from "../../assets/sun.png";
import moonImage from "../../assets/moon.png";

const UPDATE_INTERVAL: number = 60000;
const SUN_SIZE: number = 38;
const MOON_SIZE: number = 44;

const SunMoonCycle: React.FC = () => {
    const [cycleState, setCycleState] = useState({
        positionPercentage: 0,
        currentTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
        isDaytime: true,
    });

    const calculatePositionPercentage = () => {
        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        return (totalMinutes / (24 * 60)) * 100;
    };

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

    return (
        <div className="border-outerBorderColor bg-primaryColor flex w-[95%] flex-col items-center justify-center gap-4 overflow-hidden rounded-md border-2 border-solid p-6 md:w-[600px] md:flex-row">
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
                        title={cycleState.currentTime}
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
