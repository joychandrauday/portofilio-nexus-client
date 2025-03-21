import Head from 'next/head';
import { IBlog } from '@/types';
import { getAllBlogs } from '@/service/blog';
import BlogContainer from '@/components/module/blog/BlogContainer';

export interface APIResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        blogs: IBlog[]
    }; // The array of blogs
}

const BlogPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const pageQuery = `page=${page}`;
    const data = await getAllBlogs('10', pageQuery);

    console.log(data);

    return (
        <>
            <Head>
                <title>Blog Page | Explore Latest Articles</title>
                <meta name="description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta name="keywords" content="blog, articles, latest news, insights, trends" />
                <meta name="author" content="Your Website Name" />
                <meta property="og:title" content="Blog Page | Explore Latest Articles" />
                <meta property="og:description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/default-image.jpg" />
                <meta property="og:url" content="https://yourwebsite.com/blog" />
                <meta name="twitter:title" content="Blog Page | Explore Latest Articles" />
                <meta name="twitter:description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta name="twitter:image" content="/default-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className='w-[95%] mx-auto py-12 md:w-[90%] lg:w-[85%]'>
                <h1 className="text-4xl font-bold text-left text-gray-900 dark:text-white mb-12 sm:text-3xl md:text-4xl">
                    Welcome to Blog Page
                </h1>
                <BlogContainer data={data.data} />
            </div>
        </>
    );
};

export default BlogPage;
