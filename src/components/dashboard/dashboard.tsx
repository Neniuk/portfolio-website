import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "Happy", mood: 300 },
    { month: "Sleepy", mood: 350 },
    { month: "Sad", mood: 50 },
    { month: "Angry", mood: 10 },
    { month: "Alert", mood: 0 },
];

const chartConfig = {
    mood: {
        label: "Mood",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

function MoodRadarChart({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] p-2"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey="mood"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col text-sm">
                <div className="text-muted-foreground flex flex-row items-center gap-2 leading-none">
                    <span>Last updated:</span>
                    <span className="font-medium">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}

function Dashboard() {
    return (
        <div className="grid grid-flow-row grid-cols-3 gap-6 p-6">
            <Card className="col-span-1 row-span-2 max-h-[300px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row items-center justify-start space-x-4 text-start">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2>Mattias Slotte</h2>
                        </div>
                    </CardTitle>
                    <CardDescription className="text-start">
                        M.Sc. Student in Computer Science - Cloud Software
                        Engineer Trainee.
                    </CardDescription>
                    <CardAction>
                        <Button
                            variant="outline"
                            size="sm"
                            className="acrylic flex flex-row items-center justify-center text-center"
                        >
                            <span>GitHub</span>
                            <OpenInNewIcon />
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>

            <Card className="col-span-2 row-span-1">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        Overview of your recent activities and updates.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>No recent activity yet.</p>
                </CardContent>
                <CardFooter>
                    <CardAction>View All</CardAction>
                </CardFooter>
            </Card>

            <MoodRadarChart className="col-span-1 row-span-1" />

            {/* <Card className="col-span-2 row-span-2">
                <CardHeader>
                    <CardTitle>Graph</CardTitle>
                    <CardDescription>
                        Visual representation of...
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Graph will be displayed here.</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm">
                        Updated {new Date().toLocaleDateString()}
                    </p>
                </CardFooter>
            </Card> */}

            <Card>
                <CardHeader>
                    <CardTitle>Project Title</CardTitle>
                    <CardDescription>
                        Brief description of the project.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Technologies used: React, Node.js, etc.</p>
                </CardContent>
                <CardFooter>
                    <CardAction>View Project</CardAction>
                </CardFooter>
            </Card>
        </div>
    );
}

export { Dashboard };
