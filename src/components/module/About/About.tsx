'use client';
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import Education from "@/components/utils/Education";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Link from "next/link";
// Define types for the fetched data
interface AboutData {
    content: string;
    title: string;
}

interface SocialData {
    github: string;
    linkedin: string;
    facebook: string;
    resume: string;
}

// Updated EducationData type
export interface EducationData {
    id: string;
    institution: string;
    degree: string;
    specialization: string;
    startYear: string;
    endYear: string;
    description: string;
}

const About = ({ about, social, education }: { about: AboutData, social: SocialData, education: EducationData[] }) => {


    return (
        <section className="py-8  w-[95%] mx-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Left Section: About Text */}
                    <div className="lg:w-1/2 lg:pl-12 text-center lg:text-right">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                            {about.title}
                        </h1>
                        <div
                            className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
                            dangerouslySetInnerHTML={{ __html: about.content }}
                        ></div>

                        {/* Social Media Links */}
                        <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                            <a
                                href={social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaGithub className="text-lg" /> Github
                                    </div>
                                </ShinyButton>
                            </a>
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaLinkedin className="text-lg" /> Linkedin
                                    </div>
                                </ShinyButton>
                            </a>
                            <Link
                                href={social.facebook}
                                target="_blank"
                                className="w-full sm:w-auto"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <FaFacebook className="text-lg" /> Facebook
                                    </div>
                                </ShinyButton>
                            </Link>

                            <Link
                                href={social.resume}
                                target="_blank"
                                className="w-full sm:w-auto"
                            >
                                <ShinyButton>
                                    <div className="flex items-center gap-2">
                                        <IoDocumentText className="text-lg" /> Resume
                                    </div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section: Education */}
                    <div className="lg:w-1/2">
                        <Education educationData={education} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
