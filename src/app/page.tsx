import React, { FC } from "react";
import Head from "next/head";
import HomeBannerBlog from "@/components/module/blog/Blog";
import BannerSkill from "@/components/module/Skill/BannerSkill";
import BannerElements from "@/components/module/Homepage/BannerElements";
import Contact from "./contact/page";
import { getBanner } from "@/service/Credentials/banner";
import { getsocial } from "@/service/Credentials/social";
import { getSkills } from "@/service/Skill";
import { getAllBlogs } from "@/service/blog";
import BannerProject from "@/components/module/project/BannerProject";

const HomeBannerElements: FC = async () => {
  const bannerData = await getBanner()
  const social = await getsocial()
  const skills = await getSkills()
  const blogs = await getAllBlogs('3', '')
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
      <div className="min-h-[90vh] py-10 sm:py-16 md:py-24 lg:py-20">
        <BannerElements banner={bannerData} social={social} />
        < div className="skill-section mt-12">
          <BannerSkill skills={skills} />
        </div>
        <div className="projectStack mt-12">
          <BannerProject />
        </div>
        <div className="py-12 blog section">
          <HomeBannerBlog blogs={blogs?.data?.blogs} />
        </div>
        <div className="py-4">
          <Contact />
        </div>
      </div >
    </>
  );
};

export default HomeBannerElements;
