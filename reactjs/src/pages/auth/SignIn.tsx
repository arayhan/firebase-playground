import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, login, loginWithGoogle, logout } from "../../models/auth.model";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

const SignIn = () => {
  const user = getCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="grid min-h-screen bg-gray-200 place-items-center">
      <div className="container max-w-screen-sm">
        <div className="p-12 space-y-4 bg-white rounded shadow-md">
          <div className="flex flex-col gap-3">
            <Input label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            belum punya akun?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>
          <div className="space-x-3">
            {!user && (
              <>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={loginWithGoogle}>Login with Google</Button>
              </>
            )}
            {user && <Button onClick={logout}>Logout, {user.displayName}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
