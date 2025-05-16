import { Login } from "@/components/Login";
import SignUpForm from "@/components/SignUpForm";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useState } from "react";

export function AuthPage() {
  const [currentTab, setCurrentTab] = useState("signup");

  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs
        defaultValue="signup"
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsContent value="signup">
          <SignUpForm setCurrentTab={setCurrentTab} />
        </TabsContent>
        <TabsContent value="login">
          <Login setCurrentTab={setCurrentTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
