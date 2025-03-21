/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const DashboardPage = async () => {
  // Get session data
  const session = await getServerSession(authOptions);

  // If session is null, handle it by using default values
  const sanitizedSession = session ? sanitizeSessionData(session) : {
    user: {
      name: "Guest",
      email: "No email available",
      image: "/default-avatar.png",
    },
  };

  function sanitizeSessionData(session: any) {
    return {
      user: {
        name: session.user?.name || "Guest",
        email: session.user?.email || "No email available",
        image: session.user?.image || "/default-avatar.png",
      },
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-white p-6 relative">
      {/* Main Card */}
      <Card className="w-full max-w-lg shadow-xl backdrop-blur-md rounded-xl p-8 relative bg-gradient-to-r from-transparent to-charcoal border border-gray-800 z-40">
        {/* Grain Effect Overlay */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/textured-material-nobody-grunge-paper_1136-348.jpg')] opacity-20 z-10"></div>

        <CardHeader className="text-center z-20">
          <h1 className="text-3xl font-semibold tracking-wide">
            Welcome, <span className="text-yellow-400">{sanitizedSession.user?.name}</span>
          </h1>
          <p className="text-gray-300 mt-2 text-lg">This is your personalized dashboard</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center z-20 mt-6">
          <Image
            src={sanitizedSession.user?.image}
            width={120}
            height={120}
            alt={sanitizedSession.user?.name}
            className="rounded-full border-4 border-gray-700 shadow-lg mb-4"
          />
          <p className="text-lg font-medium">{sanitizedSession.user?.email}</p>
        </CardContent>
      </Card>

      {/* Decorative Shape */}
      <div className="absolute w-40 h-40 bg-yellow-400 rounded-full top-1/4 left-1/4 opacity-70 transform rotate-45 z-10"></div>
      <div className="absolute w-32 h-32 bg-indigo-500 rounded-full bottom-1/4 right-1/4 opacity-60 transform rotate-45 z-10"></div>
    </div>
  );
};

export default DashboardPage;
