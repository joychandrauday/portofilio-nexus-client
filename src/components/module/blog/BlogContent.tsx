'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Heart, Eye } from "lucide-react";
import { Blog } from "@/types";

interface BlogContentProps {
    blog: Blog;
}

const BlogContent = ({ blog }: BlogContentProps) => {
    const [likes, setLikes] = useState(blog.likes);
    const [hearts, setHearts] = useState(blog.hearts);
    const [comments, setComments] = useState(blog.comments);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLike = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${blog._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes: likes + 1 }),
            });
            if (response.ok) {
                setLikes(likes + 1);
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const handleHeart = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blog._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hearts: hearts + 1 }),
            });
            if (response.ok) {
                setHearts(hearts + 1);
            }
        } catch (error) {
            console.error("Error updating hearts:", error);
        }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blog._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comments: [...comments, {
                        user: "Current User", // Replace with actual user data
                        content: newComment,
                        createdAt: new Date()
                    }]
                }),
            });
            if (response.ok) {
                setComments([...comments, {
                    user: "Current User",
                    content: newComment,
                    createdAt: new Date()
                }]);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle optional createdAt
    const displayDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString()
        : new Date().toLocaleDateString(); // Fallback to current date if undefined

    return (
        <div className="min-h-screen ">
            {/* Banner Section - Updated Design */}
            <div className="relative h-[50vh] w-full bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-center">
                <div className="text-center px-4 max-w-5xl mx-auto">
                    <Badge className="mb-4  text-emerald-800 hover:bg-gray-100">
                        {blog.category.name}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-gray-100">
                        <div className="flex items-center gap-2">
                            <Image
                                src={blog.author.profileImage || '/favicon.png'}
                                width={48}
                                height={48}
                                alt={blog.author.name}
                                className="rounded-full border-2 border-white shadow-md"
                            />
                            <div>
                                <p className="font-semibold text-lg">{blog.author.name}</p>
                                <p className="text-sm text-gray-200">
                                    {displayDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className=" shadow-xl">
                    <CardContent className="p-8">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </CardContent>
                </Card>

                {/* Engagement Metrics */}
                <Card className="mt-6  shadow-xl">
                    <CardContent className="p-6 flex flex-wrap gap-4 items-center">
                        <Button variant="outline" onClick={handleLike}>
                            <ThumbsUp className="mr-2 h-4 w-4" /> {likes} Likes
                        </Button>
                        <Button variant="outline" onClick={handleHeart}>
                            <Heart className="mr-2 h-4 w-4" /> {hearts} Hearts
                        </Button>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Eye className="h-4 w-4" /> {blog.views} Views
                        </div>
                    </CardContent>
                </Card>

                {/* Tags */}
                <Card className="mt-6  shadow-xl">
                    <CardHeader>
                        <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-800">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <Card className="mt-6  shadow-xl">
                    <CardHeader>
                        <CardTitle>Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleComment} className="mb-6">
                            <Input
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="mb-2"
                                disabled={isSubmitting}
                            />
                            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                                <MessageCircle className="mr-2 h-4 w-4" /> Post Comment
                            </Button>
                        </form>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="border-b pb-4">
                                    <p className="font-semibold">{comment.user}</p>
                                    <p className="text-gray-600">{comment.content}</p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Back Button */}
                <div className="mt-8 flex justify-end">
                    <Link href="/blog">
                        <Button variant="outline">
                            ← Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;