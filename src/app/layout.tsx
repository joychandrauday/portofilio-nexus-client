import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";
import SideBarHome from "@/components/shared/Sidebar";
import Providers from "@/lib/providers";
import AuthProvider from "@/lib/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/shared/Footer";
import Head from "next/head";

// Load the font with the desired weights
const firaCode = Fira_Code({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-fira-code",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={firaCode.variable}>
            <Head>
                <title>My Next.js App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <a
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
                />
            </Head>
            <body className="font-mono relative">
                <AuthProvider>
                    <Providers>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <Navbar />
                            <div className="flex flex-col lg:flex-row">
                                {/* Sidebar */}
                                <SideBarHome /> {/* Hide on small screens */}

                                {/* Main Content */}
                                <main className="md:min-h-screen flex-1">
                                    {children}
                                </main>
                            </div>
                            <Footer />
                            <Toaster />
                        </ThemeProvider>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
