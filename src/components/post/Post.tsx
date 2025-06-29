import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Heart, Repeat2, MessageCircle, Bookmark, EllipsisVertical} from 'lucide-react';

const actions = [
    { icon: Heart, },
    { icon: MessageCircle, },
    { icon: Repeat2, },
];

export default function Post() {

    return (
        <Card className="w-full max-w-[600px] bg-transparent border-0 shadow-none ">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle className="text-base font-medium">João Silva</CardTitle>
                    <CardDescription className="text-xs">Postado há 2 horas</CardDescription>
                </div>
                <EllipsisVertical className="ml-auto h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent className="mt-[-15px]">
                <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Evento de voluntariado"
                    className="w-full h-auto rounded-sm "
                />
                 <p >Acabei de participar de um evento incrível de voluntariado! Juntos podemos fazer a diferença. #WeUnite #Voluntariado</p>
            </CardContent>
            <CardFooter className="flex flex-col mt-[-20px]" >
                <div className="flex justify-between w-full mb-1">
                    <span className="text-sm text-muted-foreground">24 curtidas • 8 comentários</span>
                </div>
                <div className="flex w-full justify-between">
                    <CardAction className="flex items-center gap-2">
                        {actions.map((action, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-1 cursor-pointer hover:bg-muted p-1 rounded-md transition-colors ${index === 3 ? 'ml-auto' : ''
                                    }`}
                            >
                                <action.icon className="h-5 w-5 text-muted-foreground varient-ghost" />
                            </div>
                        ))}
                    </CardAction>

                    <CardAction className="flex items-right gap-2">
                        <div>                            
                            <Bookmark className="h-5 w-5 text-muted-foreground varient-ghost" />
                        </div>
                    </CardAction>

                </div>
                <div className="w-[100%] mx-auto border-b-1 mt-4 border-foreground/50"></div>

            </CardFooter>
        </Card>
    );
}