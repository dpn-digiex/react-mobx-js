import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthPage from "@pages/auth";
import { rootStore } from "@stores/root";

const ProtectedLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    protectedRouter();
  }, []);

  const protectedRouter = () => {
    if (rootStore.userStore.isSignedIn) {
      setIsSignedIn(true);
    }
  };

  return !isSignedIn ? (
    <AuthPage />
  ) : (
    <>
      <h1>HERE IS PROTECTED LAYOUT</h1>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
