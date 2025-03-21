'use client'
import { ShinyButton } from '@/components/magicui/shiny-button';
import LoadingPage from '@/components/utils/Loading';
import { getAllBlogs } from '@/service/blog';
import { IBlog } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
const HomeBannerBlog = () => {
    const [blogs, setBlogs] = useState<IBlog | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch data dynamically on every page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRes = await getAllBlogs('', '')
                console.log(blogRes, 'hell');
                setBlogs(blogRes?.data?.blogs.slice(0, 3));

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once on component mount

    // Show loading state
    if (loading || blogs === null) {
        return <div className="text-center text-lg"><LoadingPage /></div>;
    }

    return (
        <div className="home-banner">
            <div className="blog-list grid grid-cols-1 md:grid-cols-3 gap-4">
                {blogs.length > 0 ? (
                    blogs.map((blog: IBlog) => (
                        <div key={blog._id} className="group w-full max-w-sm mx-auto rounded-xl shadow-xl transition-transform duration-300 transform perspective-1000 hover:scale-[1.05] hover:rotate-[1deg]">
                            <div className="relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-500 transition-all duration-300">
                                <div className="relative w-full h-52 overflow-hidden rounded-t-xl">
                                    <Image
                                        src={blog?.featuredImage || '/default-image.jpg'}
                                        width={500}
                                        height={500}
                                        alt={blog?.title || "Blog Image"}
                                        className="object-cover w-full h-full rounded-t-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-1"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-white">{blog.title}</h3>

                                    <div className="flex items-center text-sm gap-2">
                                        <FaUser /> {blog?.author?.name || 'Unknown'}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <Link href={`/blog/${blog._id}`}>
                                            <ShinyButton>
                                                <div className="flex items-center">
                                                    Read More →
                                                </div>
                                            </ShinyButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <LoadingPage />
                )}
            </div>
        </div>
    );
};

export default HomeBannerBlog;
