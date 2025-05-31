'use client';
import React, { useRef, FormEvent, useState, useEffect } from "react";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { getsocial } from "@/service/Credentials/social";
import { sendMessage } from "@/service/Credentials/message";

// Type declarations for formData
interface FormData {
    user_name: string;
    user_email: string;
    message: string;
}

interface SocialData {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
    medium: string;
    youtube: string;
    dribbble: string;
    behance: string;
    reddit: string;
    stackoverflow: string;
    resume: string;
}

const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [data, setData] = useState<SocialData>({
        facebook: "https://facebook.com/joychandraudayy",
        twitter: "https://twitter.com/joychandrauday",
        instagram: "https://instagram.com/joychandrauday",
        linkedin: "https://linkedin.com/in/joychandrauday",
        github: "https://github.com/joychandrauday",
        medium: "https://medium.com/@myprofile",
        youtube: "https://youtube.com/mychannel",
        dribbble: "https://dribbble.com/myprofile",
        behance: "https://behance.net/myprofile",
        reddit: "https://reddit.com/user/myprofile",
        stackoverflow: "https://stackoverflow.com/users/myprofile",
        resume: "https://joychandrauday.vercel.app/joychandraudayRESUMEd.pdf"
    });
    const [formData, setFormData] = useState<FormData>({
        user_name: "",
        user_email: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.current) return;

        console.log(formData);

        await sendMessage({
            name: formData.user_name,
            message: formData.message,
            sender: formData.user_email
        });
        toast.success("Message saved successfully!");

        // Reset form fields
        setFormData({ user_name: "", user_email: "", message: "" });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getsocial();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center md:px-12 min-h-[90vh]">
            <div className="bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-lg shadow-xl shadow-black lg:p-10 md:p-4 p-4 mx-auto flex flex-col lg:flex-row gap-16 w-full">
                {/* Left Section */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl font-bold text-center lg:text-right mb-4 text-white">Contact Me</h1>
                    <p className="text-center lg:text-right text-gray-400 mb-8">
                        Feel free to reach out to me via email or through my social media.
                    </p>
                    <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-end">
                        <a href={data.github} target="_blank" rel="noopener noreferrer">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-lg" /> Github
                                </div>
                            </ShinyButton>
                        </a>
                        <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-lg" /> Linkedin
                                </div>
                            </ShinyButton>
                        </a>
                        <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaFacebook className="text-lg" /> Facebook
                                </div>
                            </ShinyButton>
                        </a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl font-bold text-center lg:text-left mb-4 text-white">Leave a Message</h1>
                    <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <InputField type="text" name="user_name" placeholder="Your Name" value={formData.user_name} onChange={handleInputChange} />
                        <InputField type="email" name="user_email" placeholder="Your E-Mail Address" value={formData.user_email} onChange={handleInputChange} />
                        <TextareaField name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} />
                        <div className="text-center">
                            <ShinyButton>Send Message</ShinyButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

// **Reusable Input Field Component**
const InputField: React.FC<{
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, name, placeholder, value, onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-700 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
    />
);

// **Reusable Textarea Field Component**
const TextareaField: React.FC<{
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ name, placeholder, value, onChange }) => (
    <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-700 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        required
    ></textarea>
);

export default Contact;
