'use client'
import React, { JSX, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaServer, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiFirebase, SiHtml5, SiCss3, SiGit, SiTypescript, SiRedux, SiNodedotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSingleProject } from "@/service/project";

interface TechIcons {
    [key: string]: JSX.Element;
}

interface Project {
    title?: string;
    description?: string;
    coverImage?: string;
    projectType?: string;
    liveLink?: string;
    clientCodeLink?: string;
    serverCodeLink?: string;
    features?: string[];
    usedTechnologies?: string[];
    underDevelopment?: boolean;
    images?: string[];
}

const SingleProject = ({ params }: { params: Promise<{ id: string }> }) => {
    const [project, setProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [focusedImageIndex, setFocusedImageIndex] = useState(0);

    // Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            const { id } = await params;
            const data = await getSingleProject(id);
            setProject(data);
        };
        fetchProject();
    }, [params]);

    const techIcons: TechIcons = {
        React: <SiReact className="text-blue-400" />,
        NextJS: <SiNextdotjs className="text-gray-200" />,
        TailwindCSS: <SiTailwindcss className="text-teal-400" />,
        MongoDB: <SiMongodb className="text-green-400" />,
        Express: <SiExpress className="text-gray-300" />,
        Firebase: <SiFirebase className="text-orange-400" />,
        HTML: <SiHtml5 className="text-orange-500" />,
        CSS: <SiCss3 className="text-blue-600" />,
        Git: <SiGit className="text-red-500" />,
        TypeScript: <SiTypescript className="text-blue-700" />,
        Mongoose: <SiMongodb className="text-green-500" />,
        Redux: <SiRedux className="text-purple-600" />,
        NodeJS: <SiNodedotjs className="text-green-600" />,
    };

    // Normalize technology names
    const normalizeTechName = (tech: string): string => {
        const techMap: { [key: string]: string } = {
            "Next.js": "NextJS",
            "react.js": "React",
            "Tailwind CSS": "TailwindCSS",
            "Node.js": "NodeJS",
        };
        return techMap[tech] || tech;
    };

    const normalizedTechnologies = project?.usedTechnologies?.map(normalizeTechName) || [];

    // Open modal with selected image
    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Navigate to previous image
    const prevImage = () => {
        if (project?.images) {
            setFocusedImageIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1));
        }
    };

    // Navigate to next image
    const nextImage = () => {
        if (project?.images) {
            setFocusedImageIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1));
        }
    };

    if (!project) {
        return <div className="text-center py-12 text-gray-200">Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>{project.title ? `${project.title} | My Portfolio` : "Project Details"}</title>
                <meta name="description" content={project.description || "Project details and features"} />
                <meta name="keywords" content="React, Next.js, Web Development, Projects" />
                <meta name="author" content="Joy Chandra Uday" />
                <meta property="og:title" content={project.title || "Project Details"} />
                <meta property="og:description" content={project.description || "Explore project features and technologies"} />
                <meta property="og:image" content={project.coverImage || "/default-image.jpg"} />
                <meta property="og:type" content="website" />
            </Head>

            <section className="min-h-screen w-[95%] mx-auto py-12 flex justify-center items-center px-12">
                <Card className="w-full bg-gray-900/80 backdrop-blur-md border border-gray-700/50 shadow-2xl">
                    <CardHeader className="p-6 flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {project.title || "Project Details"}
                        </h1>
                        <Badge className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {project.projectType || "Unknown"}
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Cover Image and Additional Images */}
                        <div className="space-y-6">
                            {/* Cover Image */}
                            <div
                                className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-md group cursor-pointer"
                                onClick={() => project.coverImage && openModal(project.coverImage)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && project.coverImage && openModal(project.coverImage)}
                            >
                                <Image
                                    src={project.coverImage || "/default-image.jpg"}
                                    alt="Project Cover"
                                    fill
                                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Additional Images */}
                            {project.images && project.images.length > 0 ? (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-200 mb-3">Additional Images</h2>
                                    <div className="relative w-full h-[400px] flex items-center justify-center">
                                        {project.images.map((image, index) => {
                                            const offsetY = (index - focusedImageIndex) * 20; // Vertical offset for stack
                                            return (
                                                <div
                                                    key={index}
                                                    className={`absolute rounded-lg overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:z-20 ${index === focusedImageIndex ? "z-10 scale-110  shadow-xl shadow-gray-700" : "z-0"
                                                        }`}
                                                    style={{
                                                        transform: `translateY(${offsetY}px)`,
                                                    }}
                                                    onClick={() => openModal(image)}
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => e.key === "Enter" && openModal(image)}
                                                >
                                                    <Image
                                                        src={image}
                                                        alt={`Project Image ${index + 1}`}
                                                        width={800}
                                                        height={150}
                                                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                            );
                                        })}
                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-50"
                                            aria-label="Previous image"
                                        >
                                            <FaArrowLeft />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-50"
                                            aria-label="Next image"
                                        >
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No additional images available.</p>
                            )}
                        </div>

                        {/* Right Column: Details */}
                        <div className="space-y-6">
                            {/* Description */}
                            <p className="text-base text-gray-300 leading-relaxed">
                                {project.description || "No description available."}
                            </p>

                            {/* Links Section */}
                            <div className="flex flex-wrap gap-3">
                                {project.liveLink && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="bg-gray-800/50 text-gray-200 border-gray-600 hover:bg-purple-500/50 hover:text-white transition-colors"
                                    >
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt className="mr-2 h-4 w-4" /> Live Project
                                        </a>
                                    </Button>
                                )}
                                {project.clientCodeLink && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="bg-gray-800/50 text-gray-200 border-gray-600 hover:bg-purple-500/50 hover:text-white transition-colors"
                                    >
                                        <a href={project.clientCodeLink} target="_blank" rel="noopener noreferrer">
                                            <FaGithub className="mr-2 h-4 w-4" /> Client Code
                                        </a>
                                    </Button>
                                )}
                                {project.serverCodeLink && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="bg-gray-800/50 text-gray-200 border-gray-600 hover:bg-purple-500/50 hover:text-white transition-colors"
                                    >
                                        <a href={project.serverCodeLink} target="_blank" rel="noopener noreferrer">
                                            <FaServer className="mr-2 h-4 w-4" /> Server Code
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {/* Features Section */}
                            {project.features && project.features.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-200">Key Features</h2>
                                    <ul className="mt-3 space-y-2 text-gray-300">
                                        {project.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start text-sm">
                                                <span className="mr-2 text-green-400">✔</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies Section */}
                            {normalizedTechnologies.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-200">Technologies Used</h2>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {normalizedTechnologies.map((tech: string, index: number) => (
                                            techIcons[tech] && (
                                                <Button
                                                    key={index}
                                                    variant="ghost"
                                                    className="flex items-center text-gray-300 hover:bg-gray-700/50 transition-colors"
                                                >
                                                    {techIcons[tech]}
                                                    <span className="ml-2">{tech}</span>
                                                </Button>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Project Status Section */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-200">Project Status</h2>
                                <p className="mt-2 text-sm">
                                    {project.underDevelopment ? (
                                        <span className="text-red-400">🚧 Under Development</span>
                                    ) : (
                                        <span className="text-green-400">✔ Completed</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Image Modal */}
            {isModalOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview modal"
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] bg-gray-900/80 rounded-lg shadow-lg p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-200 hover:text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center z-50"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        <div className="relative w-full h-full max-w-[80vw] max-h-[80vh]">
                            <Image
                                src={selectedImage}
                                width={1200}
                                height={200}
                                alt="Full-size project image"
                                className="object-contain rounded-lg"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleProject;