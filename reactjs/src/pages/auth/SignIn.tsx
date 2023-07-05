import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase.config";
import { GoogleAuthProvider, User, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

type Props = {};

const SignIn = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      console.log(user);
    } else {
      console.log("no user");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log({ firebaseUser });
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="container py-20">
        <div className="p-12 space-y-4 bg-white rounded shadow-md">
          <div>
            <h1>LOGIN</h1>
          </div>
          <div>
            <label>
              <div>Email</div>
              <input className="px-3 py-1 border rounded-md" type="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              <div>Password</div>
              <input className="px-3 py-1 border rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
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
                <button className="px-5 py-2 bg-blue-200 rounded-md" type="button" onClick={handleLogin}>
                  Login
                </button>
                <button className="px-5 py-2 bg-blue-200 rounded-md" type="button" onClick={handleLoginWithGoogle}>
                  Login with Google
                </button>
              </>
            )}
            <button className="px-5 py-2 bg-blue-200 rounded-md" type="button" onClick={getCurrentUser}>
              Check User
            </button>
            {user && (
              <button className="px-5 py-2 bg-blue-200 rounded-md" type="button" onClick={handleLogout}>
                Logout, {user.displayName}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
