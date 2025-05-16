import { Login } from "@/components/Login";
import SignUp from "@/components/SignUp";
import SignUpCompany from "@/components/SignUpCompany";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useState } from "react";

export function Auth() {
  const [currentTab, setCurrentTab] = useState("signup");

  return (
    <div className="flex justify-center h-screen">
      <Tabs
        defaultValue="login"
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        
        <TabsContent value="signup">
          <SignUp setCurrentTab={setCurrentTab} />
        </TabsContent>

        <TabsContent value="login">
          <Login setCurrentTab={setCurrentTab} />
        </TabsContent>
        <TabsContent value="signupcompany">
          <SignUpCompany setCurrentTab={setCurrentTab} />
        </TabsContent>
      
      </Tabs>
    </div>
  );
}

export default Auth;
