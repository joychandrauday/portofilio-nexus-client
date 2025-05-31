import { notFound } from "next/navigation";
import { getSingleBlog } from "@/service/blog";
import BlogContent from "@/components/module/blog/BlogContent";

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    if (!id) return notFound();

    try {
        const { data: blog } = await getSingleBlog(id);
        console.log(blog.content);
        return (
            <BlogContent blog={blog} />
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return notFound();
    }
};

export default SingleBlog;
