import { useForm } from "react-hook-form";
import { useMutationHooks } from "../hooks/useMutation";
import { useState } from "react";

type FormValue = {
  tenderDescription: string;
  tenderName: string;
  tenderStartTime: string;
  tenderEndTime: string;
  bufferTime: string;
};

const TenderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValue>();
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync } = useMutationHooks("/tender");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await mutateAsync(
      { ...data, bufferTime: Number(data.bufferTime) },
      {
        onSuccess() {
          setLoading(false);
          reset();
        },
        onError() {
          setLoading(false);
        },
      }
    );
  });

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="tenderName"
        >
          Tender Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tenderName"
          type="text"
          placeholder="Enter tender name"
          {...register("tenderName", { required: "Tender name is required" })}
        />
        {errors.tenderName && (
          <p className="text-red-500 text-left text-sm">
            {errors.tenderName.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="tenderDescription"
        >
          Tender Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          id="tenderDescription"
          placeholder="Enter tender description"
          {...register("tenderDescription", {
            required: "Tender description is required",
          })}
        />
        {errors.tenderDescription && (
          <p className="text-red-500 text-left text-sm">
            {errors.tenderDescription.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="tenderStartTime"
        >
          Tender Start Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tenderStartTime"
          type="datetime-local"
          {...register("tenderStartTime", {
            required: "Tender start is required",
            validate: {
              pastDate: (value) =>
                new Date(value) >= new Date() ||
                "Tender start date must be in the future",
              endDate: (value) =>
                new Date(value) < new Date(watch("tenderEndTime")) ||
                "Tender start date must be before tender end date",
            },
            valueAsDate: true,
          })}
        />
        {errors.tenderStartTime && (
          <p className="text-red-500 text-left text-sm">
            {errors.tenderStartTime.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="tenderEndTime"
        >
          Tender End Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tenderEndTime"
          type="datetime-local"
          {...register("tenderEndTime", {
            required: "Tender end time is required",
            validate: {
              futureDate: (value) =>
                new Date(value) > new Date() ||
                "Tender end date must be in the future",
              startDate: (value) =>
                new Date(value) > new Date(watch("tenderStartTime")) ||
                "Tender end date must be after tender start date",
            },
            valueAsDate: true,
          })}
        />
        {errors.tenderEndTime && (
          <p className="text-red-500 text-left text-sm">
            {errors.tenderEndTime.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left"
          htmlFor="bufferTime"
        >
          Buffer Time (minutes)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bufferTime"
          type="number"
          placeholder="Enter buffer time"
          {...register("bufferTime")}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-[0.5] disabled:cursor-default"
          type="submit"
        >
          Create Tender
        </button>
      </div>
    </form>
  );
};

export default TenderForm;
