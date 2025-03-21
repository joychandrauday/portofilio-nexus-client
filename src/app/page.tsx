import React, { FC } from "react";
import Head from "next/head";
import ProjectPage from "./projects/page";
import HomeBannerBlog from "@/components/module/blog/Blog";
import BannerSkill from "@/components/module/Skill/BannerSkill";
import BannerElements from "@/components/module/Homepage/BannerElements";

const HomeBannerElements: FC = async () => {
  return (
    <>
      {/* SEO Friendly Head */}
      <Head>
        <title>Joy Chandra Uday | Full Stack Developer</title>
        <meta
          name="description"
          content="I am a passionate MERN Stack Developer specializing in building dynamic and responsive web applications."
        />
        <meta
          name="keywords"
          content="MERN Stack, Developer, React, Next.js, MongoDB, Express.js, Node.js"
        />
        <meta name="author" content="Joy Chandra Uday" />
      </Head>
      <div className="min-h-[90vh] px-6 py-10 sm:py-16 md:py-24 lg:py-20">
        <BannerElements />
        <div className="skill-section mt-12">
          <BannerSkill />
        </div>
        <div className="projectStack mt-12">
          <ProjectPage />
        </div>
        <div className="py-12 blog section">
          <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
          <HomeBannerBlog />
        </div>
      </div>
    </>
  );
};

export default HomeBannerElements;
