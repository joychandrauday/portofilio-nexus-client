import { ProjectCard } from "@/components/utils/ProjectCard";
import { getProjects } from "@/service/project";
import { IProject } from "@/types";
import Head from "next/head";

const ProjectPage = async () => {
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

            <div className="my-10  mx-auto">
                <div className="text-left">
                    <h1 className="text-3xl pl-5 font-bold tracking-tight text-gray-800 dark:text-gray-100">
                        Recent Projects
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ">
                    {projects
                        .sort((a: { serial: never; }, b: { serial: never; }) => Number(a.serial) - Number(b.serial))
                        .map((project: IProject) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default ProjectPage;
