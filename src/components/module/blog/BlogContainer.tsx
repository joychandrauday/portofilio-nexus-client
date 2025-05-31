"use client";
import { ShinyButton } from '@/components/magicui/shiny-button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import TablePagination from '@/components/shared/TablePagination';

interface IAuthor {
    name: string;
}

interface IBlog {
    _id: string;
    title: string;
    content: string;
    featuredImage?: string;
    author: IAuthor;
}

interface APIResponse {
    blogs: IBlog[];
    meta: {
        totalPages: number;
    };
}

const BlogContainer = ({ data }: { data: APIResponse }) => {
    console.log(data.blogs, 'blog');

    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                {data?.blogs.map((blog: IBlog) => (
                    <div
                        key={blog._id}
                        className="group w-full max-w-sm mx-auto h-[400px] rounded-xl shadow-xl transition-transform duration-300 transform perspective-1000 hover:scale-[1.05] hover:rotate-[1deg]"
                    >
                        <div className="relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-500 transition-all duration-300 h-full flex flex-col">
                            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                                <Image
                                    src={blog?.featuredImage || '/default-image.jpg'}
                                    width={500}
                                    height={200}
                                    alt={blog?.title || "Blog Image"}
                                    className="object-cover w-full h-full rounded-t-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-1"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-white line-clamp-2 mb-2">
                                    {blog.title}
                                </h3>
                                <div className="flex items-center text-sm gap-2 text-gray-300">
                                    <FaUser /> {blog?.author?.name || 'Unknown'}
                                </div>
                                <div className="mt-auto flex justify-end">
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
                ))}
            </div>

            <TablePagination totalPage={data.meta.totalPages} />
        </div>
    );
};

export default BlogContainer;