import { useParams } from "react-router-dom";
import BidForm from "../../components/BidForm";
import { useAuth } from "../../context/AuthProvider";
import BidTable from "../../components/BidTable";

const Page = () => {
  const params = useParams();
  const { hasAuthorized } = useAuth();
  const tender_id = params["tender_id"];

  if (hasAuthorized) return <BidTable tender_id={tender_id || ""} />;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="md:w-1/2">
        <BidForm tender_id={tender_id || ""} />
      </div>
    </div>
  );
};

export default Page;
