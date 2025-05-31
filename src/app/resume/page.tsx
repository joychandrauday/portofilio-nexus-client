import Resume from "@/components/module/resume/Resume";
import { geteducation } from "@/service/Credentials/education";
import { getexperience } from "@/service/Credentials/experience";
import { getsocial } from "@/service/Credentials/social";
import { getSkills } from "@/service/Skill";

const Page = async () => {
    const fetchedSkills = await getSkills();
    const fetchedEducation = await geteducation();
    const fetchedExperience = await getexperience();
    const fetchedSocial = await getsocial();
    return (
        <div>
            <Resume
                skills={fetchedSkills}
                educationData={fetchedEducation}
                experienceData={fetchedExperience}
                social={fetchedSocial}
            />
        </div>
    );
}

export default Page;
