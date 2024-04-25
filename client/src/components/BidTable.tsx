import { useQueryHook } from "../hooks/useQuery";
import Loader from "./Loader";

const BidTable = ({ tender_id }: { tender_id: string }) => {
  const { data, isLoading } = useQueryHook(`/bid/${tender_id}`);

  if (isLoading) return <Loader />;
  const bids = data?.bids || [];
  const total_records = data?.total_records || 0;
  return (
    <div className="h-full  sm:w-[80%] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-center text-3xl my-4 font-bold">View Bids</h1>
      </div>

      <table className="table-auto w-full">
        <thead className="border border-gray-800 bg-gray-200">
          <tr>
            <th className="py-4 border-r border-gray-800 px-2 w-[10%]">S.no</th>
            <th className="py-4 border-r border-gray-800 px-2">Company Name</th>
            <th className="py-4 border-r border-gray-800 px-2">Bid Price</th>
            <th className="py-4 border-r border-gray-800 px-2">Bid Time</th>
            <th className="py-4 border-r border-gray-800 px-2">
              Is last minute Bid
            </th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid: any, index: number) => {
            return (
              <tr key={bid._id} className="border border-gray-800">
                <td className="text-center  border-r border-gray-800 py-3">
                  {index + 1}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {bid?.bidCompany}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {bid?.bidPrice}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {bid?.createdAt}
                </td>
                <td className="text-center  border-r border-gray-800 py-3 px-2">
                  {bid?.isLastMinuteBid ? "Yes" : "No"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;
