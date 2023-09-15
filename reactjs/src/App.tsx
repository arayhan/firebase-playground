import { useState, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { auth } from "./utils/firebase.config";
import { User } from "firebase/auth";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import CloudFunctionsPage from "./pages/cloud-functions/CloudFunctionsPage";
import CloudMessagingPage from "./pages/cloud-messaging/CloudMessagingPage";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const ProtectedRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" />;
  };

  const AuthRoute = () => {
    return user ? <Navigate to="/" /> : <Outlet />;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cloud-functions" element={<CloudFunctionsPage />} />
            <Route path="/cloud-messaging" element={<CloudMessagingPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
