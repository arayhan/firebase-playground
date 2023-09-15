import { Link, LinkProps } from "react-router-dom";

type MenuItemProps = Omit<LinkProps, "className"> & {
  label: string;
};
const MenuItem = ({ label, ...props }: MenuItemProps) => {
  return (
    <Link {...props} className="flex items-center justify-center gap-4 p-4 font-semibold bg-white rounded-md shadow-md hover:bg-gray-50">
      <img src={require("../images/icons/firebase.png")} alt="" className="w-10" />
      <div>{label}</div>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <MenuItem to="/cloud-functions" label="Firebase Cloud Functions" />
      <MenuItem to="/cloud-messaging" label="Firebase Cloud Messaging" />
    </div>
  );
};

export default Home;
