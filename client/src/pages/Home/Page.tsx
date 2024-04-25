import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useQueryHook } from "../../hooks/useQuery";
import { useAuth } from "../../context/AuthProvider";
import TenderIcon from "../../components/TenderIcon";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Page = () => {
  const navigate = useNavigate();
  const { hasAuthorized, logout } = useAuth();
  const [tableFilter, setTableFilter] = useState({ filter: "", page: 1 });
  const { data, isLoading } = useQueryHook(`/tender?page=${tableFilter.page}`);

  if (isLoading) return <Loader />;

  const tenders: any[] = data?.tenders || [];
  const total_records = data?.total_records || 0;

  return (
    <div className="h-full  sm:w-[80%] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-center text-3xl my-4 font-bold">All Tenders</h1>
        <button
          type="button"
          onClick={() => {
            if (hasAuthorized) {
              logout();
            } else {
              navigate(`/admin`);
            }
          }}
          className="px-5 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 items-center text-md cursor-pointer"
        >
          <TenderIcon.AdminLogin />
          {hasAuthorized ? "Log out" : "Login as Admin"}
        </button>
      </div>
      <table className="table-auto max-h-[80%] border border-red-600 h-full">
        <thead className="border border-gray-800 bg-gray-200">
          <tr>
            <th className="py-4 border-r border-gray-800 px-2 w-[10%]">S.no</th>
            <th className="py-4 border-r border-gray-800 px-2">Name</th>
            <th className="py-4 border-r border-gray-800 px-2">Description</th>
            <th className="py-4 border-r border-gray-800 px-2">Start time</th>
            <th className="py-4 border-r border-gray-800 px-2">End time</th>
            <th className="py-4 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders?.map((tender: any, index: number) => {
            return (
              <tr key={tender._id || index} className="border border-gray-800">
                <td className="text-center  border-r border-gray-800 py-3">
                  {index + 1}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {tender?.tenderName}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {tender?.tenderDescription}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {tender?.tenderStartTime}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {tender?.tenderEndTime}
                </td>

                <td className="my-4 px-2 flex gap-1">
                  {hasAuthorized ? (
                    <button
                      type="button"
                      title="View Bids"
                      onClick={() => {
                        navigate(`/bid/${tender?._id}`);
                      }}
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 items-center  cursor-pointer"
                    >
                      <div className="min-w-5">
                        <TenderIcon.ViewBidIcon />
                      </div>
                      View
                    </button>
                  ) : (
                    <button
                      type="button"
                      title="Bid"
                      onClick={() => {
                        navigate(`/bid/${tender?._id}`);
                      }}
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 items-center flex-row-reverse cursor-pointer"
                    >
                      <TenderIcon.BidIcon />
                      Bid
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
        <Pagination
          pageSize={10}
          onChange={(page, _) => {
            setTableFilter((pre) => ({ ...pre, page }));
          }}
          total={total_records}
        />
      </div>
    </div>
  );
};

export default Page;
