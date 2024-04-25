import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../hooks/useQuery";
import Loader from "./Loader";
import { useMutationHooks } from "../hooks/useMutation";
import { useState } from "react";

type FormValue = {
  bidPrice: string;
  bidCompany: string;
};

const BidForm = ({ tender_id }: { tender_id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useQueryHook(`/tender/${tender_id}`);
  const { mutateAsync } = useMutationHooks("/bid");

  const onSubmit = handleSubmit((data) => {
    const payload = { ...data, tenderId: tender_id };
    setLoading(true);
    mutateAsync(payload, {
      onSuccess() {
        setLoading(false);
        navigate("/");
      },
      onError() {
        setLoading(false);
      },
    });
  });

  if (isLoading) return <Loader />;

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-semibold mb-5">Bid a Tender</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="tenderId"
        >
          Selected Tender
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
          id="tenderName"
          type="text"
          readOnly
          disabled
          value={data?.tenderName || ""}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="bidPrice"
        >
          Bid Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          id="bidPrice"
          type="number"
          placeholder="Enter bid price in Rs"
          {...register("bidPrice", {
            required: "Bid price is required",
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(Number(value))) {
                return "Bid price must be a number";
              }
              if (Number(value) <= 0) {
                return "Bid price must be greater than 0";
              }
              return true;
            },
          })}
        />
        {errors.bidPrice && (
          <p className="text-red-500 text-left text-sm">
            {errors.bidPrice.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="bidCompany"
        >
          Bid Company
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          id="bidCompany"
          placeholder="Enter tender description"
          {...register("bidCompany", {
            required: "Bid company is required",
            minLength: {
              message: "Bid company must be at least 3 characters",
              value: 5,
            },
          })}
        />
        {errors.bidCompany && (
          <p className="text-red-500 text-left text-sm">
            {errors.bidCompany.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          Create Tender
        </button>
      </div>
    </form>
  );
};

export default BidForm;
