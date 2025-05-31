/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // Ensure the code runs only on the client side
import { ShinyButton } from "@/components/magicui/shiny-button";
import Image from "next/image";
import { JSX } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

// Type Definitions
interface IEducation {
    map(arg0: (education: any, index: any) => JSX.Element): import("react").ReactNode;
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    description: string;
}

interface ISkill {
    map(arg0: (skill: any, index: any) => JSX.Element): import("react").ReactNode;
    title: string;
    image: string;
    type: string;
}

interface IExperience {
    map(arg0: (experience: any, index: any) => JSX.Element): import("react").ReactNode;
    role: string;
    company: string;
    year: string;
    description: string;
}

interface ISocial {
    github: string;
    linkedin: string;
    facebook: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });
};

const Resume = ({
    skills,
    educationData,
    experienceData,
    social }: {
        skills: ISkill,
        educationData: IEducation,
        experienceData: IExperience,
        social: ISocial,
    }
) => {



    return (
        <section className="pt-16 lg:pt-24 w-[95%] mx-auto">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-12">
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Joy Chandra Uday</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto lg:mx-0">
                            Passionate MERN Stack Developer specializing in building dynamic and responsive web applications.
                        </p>
                    </div>
                    <div className="lg:ml-8 flex justify-center">
                        <a href="/joychandraudayRESUMEd.pdf" download target="_blank" rel="noreferrer">
                            <ShinyButton>Download Resume</ShinyButton>
                        </a>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Education</h2>
                    <div className="space-y-6">
                        {educationData.map((education, index) => (
                            <div key={index} className="mb-8 relative">
                                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 border-2 border-white"></div>
                                <div className="flex items-start gap-4">
                                    {/* Date range */}
                                    <div className="text-sm text-gray-400">
                                        {formatDate(education.startYear)} - {formatDate(education.endYear)}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-1">{education.degree}</h3>
                                <p className="text-base text-gray-500">{education.institution}</p>
                                <p className="text-sm text-gray-300 mt-2">{education.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Skills</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="group flex flex-col items-center justify-center text-center relative">
                                <div className="w-16 h-16 mb-4 relative group-hover:scale-110 transition-transform duration-200">
                                    <Image src={skill.image} alt={skill.title} width={64} height={64} />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{skill.title}</h3>
                                <div className="absolute top-0 right-4 hidden group-hover:block text-sm bg-gray-800 text-white p-2">
                                    {skill.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h2>
                    <div className="space-y-6">
                        {experienceData.map((experience, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{experience.year}</p>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{experience.role}</h3>
                                <p className="text-base text-gray-600 dark:text-gray-400">{experience.company}</p>
                                <p className="text-base text-gray-500 dark:text-gray-400">{experience.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contact</h2>
                    <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                        <a href={`${social.github}`} target="_blank" rel="noopener noreferrer">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-lg" /> Github
                                </div>
                            </ShinyButton>
                        </a>
                        <a href={`${social.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-lg" /> Linkedin
                                </div>
                            </ShinyButton>
                        </a>
                        <a href={`${social.facebook}`} target="_blank">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaFacebook className="text-lg" /> Facebook
                                </div>
                            </ShinyButton>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
