import About from "@/components/module/About/About";
import { getabout } from "@/service/Credentials/about";
import { geteducation } from "@/service/Credentials/education";
import { getsocial } from "@/service/Credentials/social";

const Page = async () => {
    const fetchedAbout = await getabout();
    const fetchedSocial = await getsocial();
    const fetchedEducation = await geteducation();
    return (
        <div>
            <About about={fetchedAbout} social={fetchedSocial} education={fetchedEducation} />
        </div>
    );
}

export default Page;
