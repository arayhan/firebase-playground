import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { signUp } from "../../models/auth.model";
import { Input } from "../../components/atoms/Input";

type Props = {};

const SignUp = (props: Props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await signUp({ name, email, password });

    if (response) {
      navigate("/login");
    }
  };

  return (
    <div className="grid min-h-screen bg-gray-200 place-items-center">
      <div className="container max-w-screen-sm">
        <div className="p-12 space-y-4 bg-white rounded shadow-md">
          <div className="flex flex-col gap-3">
            <Input ref={nameRef} label="Display Name" />
            <Input ref={emailRef} label="Email" type="email" />
            <Input ref={passwordRef} label="Password" type="password" />
          </div>
          <div>
            sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
          <div className="space-x-3">
            <Button onClick={handleSignUp}>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
