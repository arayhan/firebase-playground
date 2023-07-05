import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

type Props = {};

const SignUp = (props: Props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSignUpWithEmailAndPassword = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (name && email && password) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await updateProfile(user, {
          displayName: name,
        });

        navigate("/login");
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code);
        }
      }
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="container py-20">
        <div className="p-12 space-y-4 bg-white rounded shadow-md">
          <div>
            <h1>LOGIN</h1>
          </div>
          <div className="flex flex-col gap-3">
            <label>
              <div>Display Name</div>
              <input ref={nameRef} className="px-3 py-1 border rounded-md" type="email" />
            </label>
            <label>
              <div>Email</div>
              <input ref={emailRef} className="px-3 py-1 border rounded-md" type="email" />
            </label>
            <label>
              <div>Password</div>
              <input ref={passwordRef} className="px-3 py-1 border rounded-md" type="password" />
            </label>
          </div>
          <div>
            sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
          <div className="space-x-3">
            <button className="px-5 py-2 bg-blue-200 rounded-md" type="button" onClick={handleSignUpWithEmailAndPassword}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
