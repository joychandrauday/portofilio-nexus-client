'use client'
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { RippleButton } from "@/components/magicui/ripple-button";
import { getSkills } from "@/service/Skill";
import { Skill } from "@/types";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/utils/Loading";

const BannerSkill = () => {

    const [skills, setSkills] = useState<Skill | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch data dynamically on every page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const skills = await getSkills()
                setSkills(skills);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if (loading || skills === null) {
        return <div className="text-center text-lg"><LoadingPage /></div>;
    }
    return (
        <section className="py-20 min-h-[90vh] w-[95%] mx-auto flex flex-col items-start justify-center gap-8 relative overflow-hidden">
            <div className="text-left">
                <h1 className="text-3xl pl-5 font-bold tracking-tight text-gray-800 dark:text-gray-100">
                    Skilled Stack
                </h1>
            </div>
            <div className="relative">
                <div className="h-full overflow-hidden">
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                        <Marquee pauseOnHover speed={50} className="flex space-x-8">
                            {skills.map((skill: Skill) => (
                                <TooltipProvider key={skill.title}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="p-3 rounded-xl text-center min-w-[10rem] border border-transparent shadow-md transition-transform transform hover:scale-105 bg-gradient-to-b from-gray-50 dark:from-gray-800 to-transparent">
                                                <div className="w-16 h-16 mx-auto">
                                                    <Image
                                                        unoptimized
                                                        width={64}
                                                        height={64}
                                                        className="mx-auto"
                                                        src={skill.image}
                                                        alt={`${skill.title} logo`}
                                                    />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs bg-gray-800 text-white shadow-lg p-4 rounded-lg">
                                            <h2 className="text-lg font-semibold">{skill.title}</h2>
                                            <p className="text-sm">{skill.description}</p>
                                            <RippleButton>{skill.type}</RippleButton>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Left & Right Gradient Overlays */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white dark:from-[#0A0A0A] z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-white dark:from-[#0A0A0A] z-10"></div>
            </div>
        </section>
    );
}

export default BannerSkill;
