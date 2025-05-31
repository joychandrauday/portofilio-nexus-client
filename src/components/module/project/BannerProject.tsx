import { ShinyButton } from "@/components/magicui/shiny-button";
import { ProjectCard } from "@/components/utils/ProjectCard";
import { getProjects } from "@/service/project";
import { IProject } from "@/types";
import Head from "next/head";
import { FaCopy } from "react-icons/fa";

const BannerProject = async () => {
    let { data: projects } = await getProjects();

    if (!Array.isArray(projects)) {
        console.error("Error: Expected an array but got", projects);
        projects = [];
    }

    return (
        <>
            {/* SEO Optimized Head */}
            <Head>
                <title>Recent Projects | Joy Chandra Uday</title>
                <meta
                    name="description"
                    content="Explore my recent projects showcasing my expertise in MERN stack development and modern web technologies."
                />
                <meta
                    name="keywords"
                    content="Projects, MERN Stack, Full Stack Developer, React, Next.js, MongoDB"
                />
                <meta name="author" content="Joy Chandra Uday" />
            </Head>

            <div className="my-10 px-12 min-h-screen flex items-center justify-center flex-col mx-auto">
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-3xl pl-5 font-bold tracking-tight text-gray-800 dark:text-gray-100">
                        Recent Projects
                    </h1>
                    <a
                        href={'/projects'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ShinyButton>
                            <div className="flex items-center gap-2">
                                <FaCopy className="text-lg" /> all Projects
                            </div>
                        </ShinyButton>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
                    {projects
                        .sort((a: { serial: never; }, b: { serial: never; }) => Number(a.serial) - Number(b.serial))
                        .slice(0, 3)
                        .map((project: IProject) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default BannerProject;
