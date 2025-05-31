'use client'
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Skill } from "@/types";

// Define the type for skillBranches
type SkillBranches = {
    [key in 'frontend' | 'backend' | 'fullStack' | 'database' | 'utility' | 'language']: Skill[];
};

const BannerSkill = ({ skills }: { skills: Skill[] }) => {
    // Group skills by type
    const skillBranches: SkillBranches = {
        frontend: skills.filter(skill => skill.type.toLowerCase() === "frontend"),
        backend: skills.filter(skill => skill.type.toLowerCase() === "backend"),
        fullStack: skills.filter(skill => skill.type.toLowerCase() === "full-stack"),
        database: skills.filter(skill => skill.type.toLowerCase() === "database"),
        utility: skills.filter(skill => skill.type.toLowerCase() === "utility"),
        language: skills.filter(skill => skill.type.toLowerCase() === "language"),
    };

    // Function to render a branch
    const renderBranch = (branchSkills: Skill[]) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center">
            {branchSkills.map((skill) => (
                <TooltipProvider key={skill._id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="group relative p-3 rounded-lg text-center min-w-[7rem] border border-transparent shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm">
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="w-10 h-10 mx-auto relative">
                                    <Image
                                        unoptimized
                                        width={40}
                                        height={40}
                                        className="mx-auto transform group-hover:rotate-12 transition-transform duration-300"
                                        src={skill.image}
                                        alt={`${skill.title} logo`}
                                    />
                                </div>
                                <p className="mt-1 text-xs font-semibold text-white">{skill.title}</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs bg-gray-900/95 text-white shadow-xl p-4 rounded-lg border border-purple-500/40">
                            <h3 className="text-base font-bold text-purple-300">{skill.title}</h3>
                            <p className="text-xs text-gray-200">{skill.description}</p>
                            <RippleButton className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs">
                                {skill.type}
                            </RippleButton>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );

    return (
        <section className="py-12 min-h-[70vh] w-[95%] mx-auto flex flex-col items-center justify-center gap-6 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 animate-gradient-bg">
            <style jsx>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Skilled Stack
            </h1>
            <Tabs defaultValue="frontend" className="max-w-5xl mx-auto">
                <TabsList className="flex justify-center bg-transparent">
                    {Object.keys(skillBranches).map((branch) => (
                        skillBranches[branch as keyof SkillBranches].length > 0 && (
                            <TabsTrigger
                                key={branch}
                                value={branch}
                                className="px-4 py-2 mx-1 text-sm font-semibold text-gray-200 rounded-full bg-gray-800/50 hover:bg-purple-500/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 capitalize"
                            >
                                {branch}
                            </TabsTrigger>
                        )
                    ))}
                </TabsList>
                {Object.entries(skillBranches).map(([branch, branchSkills]) => (
                    branchSkills.length > 0 && (
                        <TabsContent key={branch} value={branch} className="mt-6 flex justify-center">
                            {renderBranch(branchSkills)}
                        </TabsContent>
                    )
                ))}
            </Tabs>
            {/* Left & Right Gradient Overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-gray-900/80 to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-gray-900/80 to-transparent z-10"></div>
        </section>
    );
};

export default BannerSkill;