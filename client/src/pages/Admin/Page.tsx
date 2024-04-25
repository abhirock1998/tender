import TenderForm from "../../components/TenderForm";
import { useAuth } from "../../context/AuthProvider";
import AdminLoginModal from "../../components/AdminLoginModal";

const Page = () => {
  const { hasAuthorized } = useAuth();

  if (!hasAuthorized) {
    return <AdminLoginModal />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="md:w-1/2">
        <h1 className="text-2xl font-semibold mb-5">Create a Tender</h1>
        <TenderForm />
      </div>
    </div>
  );
};

export default Page;
