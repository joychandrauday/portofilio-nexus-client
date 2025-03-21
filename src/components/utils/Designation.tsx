"use client";
import { TypeAnimation } from "react-type-animation";

const Designation = ({ designations }: { designations: string[] }) => {
    // Fallback to an empty array if designations is undefined or null
    const safeDesignations = designations || [];

    // Create sequence dynamically based on the passed designations
    const sequence = safeDesignations.flatMap((designation) => [designation, 1500]);

    return (
        <TypeAnimation
            className="inline text-lg md:text-xl font-semibold"
            sequence={sequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
        />
    );
};

export default Designation;
