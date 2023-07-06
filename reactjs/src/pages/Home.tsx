import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase.config";

type Props = {};

const Home = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleClickTriggerSayHello = async () => {
    const sayHello = httpsCallable(functions, "sayHello");
    const response = await sayHello({ name: "arayhan" });
    console.log({ response });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-5">
      <div className="text-3xl font-bold">Home</div>
      <div>
        <div className="text-xl font-bold">Message from Cloud Function: {message}</div>
        <button className="px-5 py-2 rounded-md bg-violet-200" onClick={handleClickTriggerSayHello}>
          Trigger Say Hello
        </button>
      </div>
    </div>
  );
};

export default Home;
