import { resume, sanityImageUrl } from "@/src/services/sanity";
import { Metadata } from "next";
import { Card } from "@/shadcn/components/ui/card";
import "./index.css";
import { PrintButton } from "./components/PrintButton";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { richTextComponents } from "@/src/utils/richTextComponents";
import { LinkIcon } from "./components/LinkIcon";
import { DateTime } from "luxon";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Resume - Fredrik Johansen`,
};

export default async function ResumePage() {
  const resumeContent = await resume.getResumeContent();

  const groupedSkills: Map<string, string[]> = new Map();
  resumeContent.skills.forEach(({ group, skill }) => {
    const currentGroupedSkills = groupedSkills.get(group);
    if (currentGroupedSkills) {
      const newGroupedSkills = [...currentGroupedSkills, skill];
      groupedSkills.set(group, newGroupedSkills);
    } else {
      groupedSkills.set(group, [skill]);
    }
  });

  return (
    <div className="flex flex-col mb-4">
      <PrintButton />

      <Card
        className={
          "p-8 print:p-6 print:shadow-none print:border-none max-w-5xl print:max-w-[210mm] mx-auto print:block print:bg-white print:text-neutral-950"
        }
      >
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold print:text-neutral-900">{resumeContent.title}</h1>
              <h2 className="text-xl text-muted-foreground print:text-neutral-700">{resumeContent.subTitle}</h2>
            </div>
            <div className="size-fit">
              <Image
                className="rounded-full object-contain"
                src={sanityImageUrl(resumeContent.image.asset._ref).url()}
                alt={resumeContent.image.alt}
                width={resumeContent.image.width}
                height={resumeContent.image.height}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {resumeContent.links.map(({ icon, text, link }, index) => (
              <div className="flex items-center gap-2" key={`link-${index}`}>
                <LinkIcon icon={icon} className="h-4 w-4 print:text-neutral-600" />
                {link ? (
                  <a className="print:text-neutral-600" target="_blank" href={link}>
                    {text}
                  </a>
                ) : (
                  <span className="print:text-neutral-600">{text}</span>
                )}
              </div>
            ))}
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-6">
          <PortableText
            value={resumeContent.description}
            components={richTextComponents}
            onMissingComponent={(message, options) => {
              console.error(message, {
                type: options.type,
                nodeType: options.nodeType,
              });
            }}
          />
        </section>

        {/* Two Column Layout for the rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="md:col-span-2">
            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">WORK EXPERIENCES</h2>
              <div className="flex flex-col gap-4">
                {resumeContent.workExperiences.map((workExperience, index) => (
                  <div key={`work-experience-${index}`} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-row gap-1 font-semibold">
                        <h3>{workExperience.role}</h3>
                        <span> - </span>
                        {workExperience.link ? (
                          <a
                            className="flex flex-row gap-1 items-center hover:text-neutral-700 hover:dark:text-neutral-300"
                            target="_blank"
                            rel="noreferrer"
                            href={workExperience.link}
                          >
                            <span>{workExperience.name}</span>
                            <ExternalLink className="size-4" />
                          </a>
                        ) : (
                          <h3>{workExperience.name}</h3>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {DateTime.fromFormat(workExperience.fromDate, "yyyy-LL-dd").toFormat("LLL yyyy")} -{" "}
                        {workExperience.toDate
                          ? DateTime.fromFormat(workExperience.toDate, "yyyy-LL-dd").toFormat("LLL yyyy")
                          : "Present"}
                      </span>
                    </div>
                    <PortableText
                      value={workExperience.description}
                      components={richTextComponents}
                      onMissingComponent={(message, options) => {
                        console.error(message, {
                          type: options.type,
                          nodeType: options.nodeType,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6" id="projects">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">PROJECTS</h2>

              <div className="flex flex-col gap-2">
                {resumeContent.projects.map((project, index) => (
                  <div key={`project-${index}`} className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className="text-sm text-muted-foreground">{project.type}</span>
                    </div>
                    <PortableText
                      value={project.description}
                      components={richTextComponents}
                      onMissingComponent={(message, options) => {
                        console.error(message, {
                          type: options.type,
                          nodeType: options.nodeType,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="md:col-span-1">
            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">EDUCATION</h2>

              <div className="flex flex-col gap-4">
                {resumeContent.educations.map((education, index) => (
                  <div key={`education-${index}`} className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{education.type}</h3>
                      <span className="text-sm text-muted-foreground">
                        {DateTime.fromFormat(education.fromDate, "yyyy-LL-dd").toFormat("yyyy")} -{" "}
                        {DateTime.fromFormat(education.toDate, "yyyy-LL-dd").toFormat("yyyy")}
                      </span>
                    </div>
                    <p className="text-sm">{education.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">LANGUAGES</h2>

              <div className="flex flex-col gap-2">
                {resumeContent.languages.map((language, index) => (
                  <div key={`language-${index}`} className="flex flex-col">
                    <div className="flex justify-between">
                      <span>{language.language}</span>
                      <span className="text-sm text-muted-foreground">({language.level})</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">INTERESTS</h2>
              <ul className="grid grid-cols-2 gap-2">
                {resumeContent.interests.map((interest, index) => (
                  <li key={`interest-${index}`}>{interest}</li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">SKILLS</h2>

              {Array.from(groupedSkills).map(([group, skills], index) => (
                <div key={`skills-group-${index}`} className="flex flex-col">
                  <h3 className="font-bold mt-3 mb-2">{group}</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {skills.map((skill, index) => (
                      <li key={`skill-${index}`}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}
