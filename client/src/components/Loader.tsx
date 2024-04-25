import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center">
      <div className="">
        <BeatLoader />
        <p className="text-md">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
