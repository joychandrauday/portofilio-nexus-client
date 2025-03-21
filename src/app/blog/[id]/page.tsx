import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { getSingleBlog } from "@/service/blog";

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    if (!id) return notFound();

    try {
        const { data: blog } = await getSingleBlog(id);

        return (
            <div className="mx-auto text-white py-8 pr-4">
                {/* Banner Section */}
                <div className="min-h-[45vh] relative bg-yellow-500">
                    {blog.featuredImage && (
                        <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0 z-0"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white relative z-10">{blog.title}</h1>
                        <p className="mt-2 text-black bg-yellow-500 rounded-full px-2 t relative z-10">{blog.category.name}</p>

                        {/* Author & Meta Data */}
                        <div className="mt-6 flex flex-col lg:flex-row items-center gap-4 text-gray-300 relative z-10">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={blog.author.profileImage || '/favicon.png'}
                                    width={30}
                                    height={30}
                                    className="border-emerald-500"
                                    alt={blog.author.name}
                                />
                                <div className="wrap text-left">
                                    <p className="text-md font-semibold">{blog.author.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-gray-400 text-sm lg:text-base">
                                <p>📅 {new Date(blog.createdAt).toLocaleDateString()}</p>
                                <p>👁️ {blog.views} Views</p>
                                <p>👍 {blog.likes} Likes</p>
                                <p>🤎 {blog.hearts} hearts</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Content Section */}
                <div className="max-w-5xl mx-auto mt-10 px-6">
                    <div className="p-6 bg-gray-900 shadow-md border border-gray-700">
                        <div
                            className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    </div>

                    {/* Tags */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-300">Tags:</h3>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {blog.tags.map((tag: string, index: number) => (
                                <span key={index} className="px-3 py-1 text-sm bg-emerald-600 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-end mt-8">
                        <Link href="/blog">
                            <ShinyButton>
                                <div className="flex items-center gap-2">← Back to Blogs</div>
                            </ShinyButton>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return notFound();
    }
};

export default SingleBlog;
