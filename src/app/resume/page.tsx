import { resume } from "@/src/services/sanity";
import { Metadata } from "next";
import { Card } from "@/shadcn/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Github } from "@/src/components/icons/Github";
import { LinkedIn } from "@/src/components/icons/LinkedIn";
import { Twitter } from "@/src/components/icons/Twitter";
import "./index.css";
import { PrintButton } from "./components/PrintButton";
import Image from "next/image";
import me from "../me.jpg";

export const metadata: Metadata = {
  title: `Resume - Fredrik Johansen`,
};

export default async function ResumePage() {
  const resumeContent = await resume.getResumeContent();

  return (
    <div className="flex flex-col mb-4">
      <PrintButton />

      <Card
        className={
          "p-8 print:p-6 print:shadow-none print:border-none max-w-5xl print:max-w-[210mm] mx-auto print:block"
        }
      >
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">FREDRIK JOHANSEN</h1>
              <h2 className="text-xl text-muted-foreground">Self-taught Software Developer</h2>
            </div>
            <Image className="rounded-full" src={me} width={75} height={75} alt="Picture of Fredrik Johansen" />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a target="_blank" href="tel:+4542944331">
                +45 42 94 43 31
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a target="_blank" href="mailto:fredrik1206@gmail.com">
                fredrik1206@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <a target="_blank" href="https://github.com/fredrikj31">
                github.com/fredrikj31
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Copenhagen, Denmark</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkedIn className="h-4 w-4" />
              <a target="_blank" href="https://linkedin.com/in/fredrik-johansen">
                linkedin.com/in/fredrik-johansen
              </a>
              <span></span>
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              <a target="_blank" href="https://twitter.com/fredrikj31">
                @fredrikj31
              </a>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-6">
          <p>
            Hi, I&apos;m Fredrik Johansen. I am a largely self-taught software developer. I like to develop different
            digital products that other people would benefit from. I have been developing software since I was 13 years
            old. Therefore I have a broad knowledge of the field. Software development, as always, brings many problems
            that need to be solved, but this has not stopped me from achieving the goal that I have set for myself. I am
            a hard-working person who always strives to complete the given task as well as possible.
          </p>
        </section>

        {/* Two Column Layout for the rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="md:col-span-2">
            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">WORK EXPERIENCES</h2>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Owner of Johansen Development</h3>
                  <span className="text-sm text-muted-foreground">Startup | 2021 - Present</span>
                </div>
                <p className="mt-2">
                  Johansen Development is the company I&apos;m running as Owner, which builds different apps and digital
                  products for the ordinary consumer. Johansen Development strives to produce sass (Software as a
                  Service) and digital products, which they see as a need for society.
                </p>
                <p className="mt-2">
                  Johansen Development has developed different types of apps, which is released in the Play-Store, as
                  well as developing a training app.
                </p>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6" id="projects">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">PROJECTS</h2>

              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Genbrug Danmark</h3>
                  <span className="text-sm text-muted-foreground">Mobile Application</span>
                </div>
                <p className="mt-1">
                  Genbrug Danmark is an app, made in Flutter and Firebase as backend. The idea for this app came from a
                  project in my school. Here we got to find a solution to the waste problem. We ended up making a cross-
                  platform app, which includes a map where you can find all the nearby recycling sites, and a scanner,
                  in which you could scan your trash, and it would tell you in which waste bin you should deposit your
                  giving waste.
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">LectioToCal</h3>
                  <span className="text-sm text-muted-foreground">Website Application</span>
                </div>
                <p className="mt-1">
                  LectioToCal is a desktop and web application that allows student and teachers to transfer their
                  schedules from Lectio to Google Calendar. It uses the Lectio API that I made to grab the lessons from
                  the school schedule. The application started as a desktop application but was it easy to transfer it
                  to a web app because the desktop version used Electron, as the backend.
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Lectio Scraper / API</h3>
                  <span className="text-sm text-muted-foreground">API - Application Programming Interface</span>
                </div>
                <p className="mt-1">
                  LectioScraper is a library I created over the first two years I was a student in my school. It&apos;s
                  a library to scrape Lectio.dk, which around 90% of all high schools in Denmark use for their schools.
                  Python is the chosen language on which the library is built. The library can be used for scraping the
                  different lessons you have in a week, and lessons are transferred to your calendar by using the
                  LectioToCal app.
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">High School - Subject & Elective Picker</h3>
                  <span className="text-sm text-muted-foreground">Website Application</span>
                </div>
                <p className="mt-1">
                  For my exam in Computer Science, I choose to create a web app for my school to use. The program would
                  allow both people from inside and outside the school to get an overview of the different study
                  programs, subjects, and electives you could have in our school. I also choose to create a backend. The
                  administration can use it to change the different data in the database.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="md:col-span-1">
            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">EDUCATION</h2>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">High School</h3>
                  <span className="text-sm text-muted-foreground">2019 - 2022</span>
                </div>
                <p className="text-sm">H.C. Ørsted Gymnasiet afd. Ballerup</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Primary School</h3>
                  <span className="text-sm text-muted-foreground">2009 - 2019</span>
                </div>
                <p className="text-sm">Baltorpskolen afd. Rugvænget</p>
              </div>
            </section>

            {/* Languages */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">LANGUAGES</h2>
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>Danish</span>
                  <span className="text-sm text-muted-foreground">(Native)</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>English</span>
                  <span className="text-sm text-muted-foreground">(Professional)</span>
                </div>
              </div>
            </section>

            {/* Interests */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">INTERESTS</h2>
              <ul className="grid grid-cols-2 gap-2">
                <li>Music</li>
                <li>Gaming</li>
                <li>Photography</li>
                <li>Travelling</li>
                <li>Entrepreneurship</li>
              </ul>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">SKILLS</h2>

              <h3 className="font-semibold mt-3 mb-2">Technical</h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>Frontend Programming</li>
                <li>Backend Programming</li>
                <li>App Development</li>
                <li>Object-oriented design</li>
                <li>Design and implementation of database structures</li>
              </ul>

              <h3 className="font-semibold mt-3 mb-2">Professional</h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>Effective communication</li>
                <li>Team player</li>
                <li>Strong problem solver</li>
                <li>Good time management</li>
              </ul>
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}
