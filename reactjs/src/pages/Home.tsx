import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase.config";
import { FirebaseError } from "firebase/app";
import { NavBar } from "../components/layout/NavBar";

type Props = {};

const Home = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleClickTriggerSayHello = async () => {
    try {
      const sayHello = httpsCallable(functions, "sayHello");
      const response = await sayHello({ name: "arayhan" });
      console.log({ response });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log({ error });
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container py-24">
        <div className="text-3xl font-bold">Home</div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
