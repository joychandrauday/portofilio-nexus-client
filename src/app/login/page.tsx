"use client";
import { loginUser } from "@/utils/actions/loginUser";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type FormValues = {
  email: string;
  password: string;
};

export type Response = {
  success: boolean;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {

    try {
      const res = await loginUser(data);

      if (res.data.token) {
        localStorage.setItem("accessToken", res.data.token);
        toast.success(res.message);
        router.push("/dashboard");
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]  p-5">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-lg shadow-2xl">
        <h1 className="text-center text-4xl text-white font-bold mb-6">
          Login <span className="text-teal-400">Here</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="mt-2 w-full p-3 rounded-md bg-gray-800 border border-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="mt-2 w-full p-3 rounded-md bg-gray-800 border border-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-md shadow-md font-semibold transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal-400 hover:underline">
            Create an account
          </Link>
        </p>

        <p className="text-center mt-6 text-sm text-gray-500">
          Or Sign Up Using
        </p>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-all"
          >
            <Image
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              width={30}
              height={30}
              alt="Google logo"
            />
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-all"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              width={25}
              height={25}
              alt="GitHub logo"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
