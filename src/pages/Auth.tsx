import { Login } from "@/components/Login";
import SignUp from "@/components/SignUp";
import SignUpCompany from "@/components/SignUpCompany";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useState } from "react";

export function Auth() {
  const [currentTab, setCurrentTab] = useState("login");

  return (
    <div className="flex items-center justify-center h-screen">
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
<<<<<<< HEAD:src/pages/Auth.tsx
        <TabsContent value="signupcompany">
          <SignUpCompany setCurrentTab={setCurrentTab} />
        </TabsContent>
=======
      
>>>>>>> f24f0a1 (feat: adicionando alerta):src/pages/AuthPage.tsx
      </Tabs>
    </div>
  );
}

export default Auth;
