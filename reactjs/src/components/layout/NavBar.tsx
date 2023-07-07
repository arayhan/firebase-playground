import { logout } from "../../models/auth.model";
import { Button } from "../atoms/Button";

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <div className="bg-white shadow-md">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-violet-500">Firebase Playground</div>
          <div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
