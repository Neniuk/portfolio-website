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

function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            <Card className="card">
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
                            className="flex flex-row items-center justify-center text-center"
                            // acrylic style
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <span>GitHub</span>
                            <OpenInNewIcon />
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>

            <Card className="col-span-2">
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

            <Card className="col-span-2">
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
            </Card>

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
