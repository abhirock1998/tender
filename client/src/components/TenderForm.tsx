import { useState } from "react";
import { useForm } from "react-hook-form";

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
  } = useForm<FormValue>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <div className="max-w-md mx-auto">
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
          ></textarea>
        </div>
        {/* <DateTimeRangePicker onChange={onChange} value={value} /> */}
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
          />
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
          />
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Tender
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenderForm;
