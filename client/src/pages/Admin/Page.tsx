import { useEffect } from "react";
import TenderForm from "../../components/TenderForm";

const Page = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Create a Tender</h1>
      <TenderForm />
    </div>
  );
};

export default Page;
