import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase.config";
import { FirebaseError } from "firebase/app";

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
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-5">
      <div className="text-3xl font-bold">Home</div>
      <div>
      </div>
    </div>
  );
};

export default Home;
