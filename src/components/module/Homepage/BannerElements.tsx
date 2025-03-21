"use client"; // Make this a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCopy, FaGithub } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Designation from "@/components/utils/Designation";
import { IBanner, ISocial } from "@/types";
import LoadingPage from "@/components/utils/Loading";

const BannerElements = () => {
    const [banner, setBanner] = useState<IBanner | null>(null);
    const [social, setSocial] = useState<ISocial | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch data dynamically on every page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
                    cache: "no-store", // Ensure fresh data
                });
                const bannerData = await bannerRes.json();
                setBanner(bannerData?.data?.banner);

                const socialRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
                    cache: "no-store", // Ensure fresh data
                });
                const socialData = await socialRes.json();
                setSocial(socialData?.data?.social);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once on component mount

    // Show loading state
    if (loading) {
        return <div className="text-center text-lg"><LoadingPage /></div>;
    }

    return (
        <div>
            <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start lg:justify-between lg:gap-12 text-center lg:text-left">
                {/* Optimized Image */}
                <div className="relative w-60 sm:w-72 md:w-80 lg:w-2/6 mb-8 lg:mb-0">
                    <Image
                        src={banner?.bannerImage || "/default-banner.png"} // Provide fallback image
                        alt="Joy Chandra Uday"
                        width={500}
                        height={500}
                        className="rounded-lg shadow-2xl shadow-black w-full"
                    />
                </div>

                {/* Text Section */}
                <div className="mt-8 lg:mt-0 w-full lg:w-2/3 px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        {banner?.title || "Default Title"}
                    </h1>
                    <p className="py-3 text-lg flex flex-wrap justify-center lg:justify-start items-center gap-2">
                        {banner?.designationPretext || "A Developer"}
                        <Designation designations={banner?.designations || ["MERN Stack Developer"]} />
                    </p>
                    <p className="text-gray-500 text-lg italic">
                        {banner?.subtitle || "A Passionate Developer"}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                        <a
                            href={social?.github || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-lg" /> My Github
                                </div>
                            </ShinyButton>
                        </a>
                        <Link href="/projects">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaCopy className="text-lg" /> Projects
                                </div>
                            </ShinyButton>
                        </Link>
                        <a
                            href={social?.resume || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <IoDocumentText className="text-lg" /> Resume
                                </div>
                            </ShinyButton>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerElements;
