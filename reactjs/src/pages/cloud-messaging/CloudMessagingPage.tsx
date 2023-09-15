import { Button } from "../../components/atoms/Button";

type Props = {};

const CloudMessagingPage = (props: Props) => {
  return (
    <div className="space-y-12">
      <div className="text-4xl font-semibold text-center">Cloud Messaging Demo</div>
      <div className="p-4 bg-white rounded-md shadow-md">
        <Button onClick={() => {}}>Add Notification</Button>
      </div>
    </div>
  );
};

export default CloudMessagingPage;
