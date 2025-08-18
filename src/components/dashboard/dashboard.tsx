import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Dashbaord() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
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
                            Master's student in Computer Science, cloud software
                            engineering trainee.
                        </CardDescription>
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
                    <Card className="rounded-lg bg-white p-4 shadow-lg">
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
        </div>
    );
}

export { Dashbaord };
