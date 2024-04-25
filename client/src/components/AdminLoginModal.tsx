import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useAuth } from "../context/AuthProvider";

type FormValue = {
  username: string;
  password: string;
};

const AdminLoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const { setHasAuthorized } = useAuth();

  const onSubmit = handleSubmit((data) => {
    setHasAuthorized(data.username, data.password);
  });
  return (
    <Modal>
      <form className="w-full" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold text-left mb-5">Admin Login</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="Enter email address"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for email validation
                message: "Invalid email address",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-left text-sm">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-left text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="px-4 py-3 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline px-5"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminLoginModal;
