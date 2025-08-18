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

function Dashbaord() {
    return (
        <div className="w-full max-w-4xl rounded-lg p-6 shadow-md">
            {/* Introduction card with avatar, description of me, location, title, etc */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row items-center justify-center space-x-4 text-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>Mattias Slotte</span>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Master's Student in Computer Science - Cloud Software
                        Engineer Trainee.
                    </CardDescription>
                    <CardAction>GitHub</CardAction>
                </CardHeader>
                <CardContent>
                    <p>
                        Location: [Your Location] <br />
                        Title: [Your Title]
                    </p>
                </CardContent>
                <CardFooter>
                    <CardAction>Edit Profile</CardAction>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        {" "}
                        <div className="flex flex-row items-center justify-start space-x-4 text-start">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2>Mattias Slotte</h2>
                        </div>
                    </CardTitle>
                    <CardDescription className="text-start">
                        Master's Student in Computer Science - Cloud Software
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

            <Card className="mb-6">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Example Card */}
                <Card className="rounded-lg p-4 shadow-lg">
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
        </div>
    );
}

export { Dashbaord };
