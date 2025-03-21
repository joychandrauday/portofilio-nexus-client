import { EducationData } from "@/app/about/page";

interface EducationProps {
    educationData: EducationData[];  // Adjusted to accept EducationData[]
}
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });
};


const Education: React.FC<EducationProps> = ({ educationData }) => {
    return (
        <section>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-left mb-6 text-white">Education</h2>
                <div className="relative border-l-2 border-gray-600 pl-6">
                    {educationData.map((education, index) => (
                        <div key={index} className="mb-8">
                            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 border-2 border-white"></div>
                            <div className="flex items-start gap-4">
                                {/* Date range */}
                                <div className="text-sm text-gray-400">
                                    {formatDate(education.startYear)} - {formatDate(education.endYear)}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-white mt-1">
                                {education.degree}
                            </h3>
                            <p className="text-base text-gray-500">{education.institution}</p>
                            <p className="text-sm text-gray-400">Specialization: {education.specialization}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
