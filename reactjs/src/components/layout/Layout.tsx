import { Outlet } from "react-router";
import { NavBar } from "./NavBar";

type Props = {};

export const Layout = ({}: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container py-24 space-y-6">
        <Outlet />
      </div>
    </div>
  );
};
