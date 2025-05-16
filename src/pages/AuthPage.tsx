import SignUpForm from "@/components/SignUpForm"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { useState } from "react";


export function AuthPage() {
    const [currentTab, setCurrentTab] = useState("signup");

    const tabOptions = [
        { value: "signup", label: "Sign up" },
        { value: "login", label: "Login" },
        { value: "signupcompany", label: "Sign up company" },
    ]
    return (
        <div className="flex items-center justify-center h-screen">
            <Tabs defaultValue="signup" value={currentTab} onValueChange={setCurrentTab}>
                <TabsList>
                    {tabOptions
                        .filter(tab => tab.value !== currentTab)
                        .map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                </TabsList>
                <TabsContent value="signup">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AuthPage