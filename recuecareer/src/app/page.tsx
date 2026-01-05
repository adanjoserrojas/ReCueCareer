"use client"

import './globals.css';
import { Hero5 } from '@/components/ui/Hero5';
import * as React from "react"
import { Header1 } from '@/components/ui/header';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import Component from '@/components/ui/chart-pie-label';
import { ChartBarMultiple } from '@/components/ui/bar-chart-multiple';
import MagnetLines from '@/components/ui/magnetic-grid';
import Folder from '@/components/ui/Folder';
import { ChartLineInteractive } from '@/components/ui/Line-chart';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import ScrollVelocity from '@/components/ui/Scroller-velocity';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>

const invoices = [
  {
    jobName: "Software Engineer / Embedded/C++",
    applicationStatus: "Pending",
    jobID: "RCC00002",
    Skillset: "Develop Embedded Software; Integrate algorithms into C/C++ applications; Plan, conduct, and coordinate software development activities",
  },
  {
    jobName: "Software Engineer Intern",
    applicationStatus: "Accepted",
    jobID: "RCC00003",
    Skillset: "Pursuing a degree in Computer Science, Software Engineering, or related field, Familiarity with backend development (Node.js or Python preferred), Interest in event-driven systems and distributed architectures, Exposure to APIs, JSON, and RESTful design concepts",
  },
  {
    jobName: "2025 Software Engineer Intern (Fall)",
    applicationStatus: "Pending",
    jobID: "RCC00004",
    Skillset: "Pursuing a degree in computer science or other related major graduating in Dec 2025 or by Summer 2026, Problem solver and out-of-the-box thinker, Willing to take risks and build product and systems for 1M+ users, Ability to pick up on new technologies quickly",
  },
  {
    jobName: "Data Engineer Intern",
    applicationStatus: "Rejected",
    jobID: "RCC00005",
    Skillset: "Pursuing or recently completed a Bachelor’s or Master’s degree in Computer Science, Data Science, or a related technical field, Proficiency in Python and SQL, Familiarity with data engineering concepts and tools (e.g., ETL processes, data warehousing)",
  },
  {
    jobName: "Forward Deployed Engineer (AI Gameplay Engineer)",
    applicationStatus: "Pending",
    jobID: "RCC00006",
    Skillset: "Systems Software knowledge, Profound C++, C, and Java Knowledge, Familiarity with VHDL, Operating Systems ",
  },
  {
    jobName: "Computer Arquitecture Engineer Intern",
    applicationStatus: "Accepted",
    jobID: "RCC00007",
    Skillset: "BA/BS degree or higher in Computer Science, Engineering or Game Development, 3+ years of Unity and/or Unreal Engine development experience, 3+ years of technical experience as a game developer, Exceptional product intuition, problem-solving skills, and attention to detail, Experience working with strategic partners and presenting to executives, Passionate about learning and applying cutting-edge AI research",
  },
]

export default function Home() {
  
  return (
    <div className="flex-col absolute inset-x-0 h-full w-full px-5 bottom-0 overflow-x-hidden">
      <Header1/>
      <div className="flex justify-center items-center">
        <Hero5/>
      </div>
      <div className="flex flex-col justify-center items-center text-Secondary">

        <div className="flex item-center justify-center transEffectText1 py-10">

          <div className="transEffectText1 mt-17 text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-inter font-semibold py-10 custom-blur-border">
            How we Operate
            <p className="text-2xl md:text-5xl max-w-2xl tracking-tighter py-10 text-LightCutsieGrayMiau">Take a guided tour of our platform, designed to revolutionize the job application process and streamline résumé optimization for candidates worldwide.</p>
          </div>
        </div>
        
        <h2 className="transEffectText1 text-3xl md:text-5xl max-w-xl tracking-tighter text-center font-inter font-semibold py-10">
          1. You upload your resume
        </h2>
        <div className="transEffectText1 flex flex-row items-center py-10 m-5">
          <Folder/>
          <Folder/>
          <Folder/>
        </div>

        <h2 className="transEffectText1 text-3xl md:text-5xl max-w-xl tracking-tighter text-center font-inter font-semibold py-10">
          2. We take your applications, and the current status
        </h2>

        <Table>
          <TableCaption>Your Applications</TableCaption>
          <TableHeader>
          <TableRow>
              <TableHead className="w-[100px]">Job Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Skillset Required</TableHead>
              <TableHead className="text-right">Job ID</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
          {invoices.map((job) => (
              <TableRow key={job.jobName}>
              <TableCell className="font-medium">{job.jobName}</TableCell>
              <TableCell>{job.applicationStatus}</TableCell>
              <TableCell>{job.Skillset}</TableCell>
              <TableCell className="text-right">{job.jobID}</TableCell>
              </TableRow>
          ))}
          </TableBody>
        </Table>

        <h2 className="transEffectText1 text-3xl md:text-5xl max-w-xl tracking-tighter text-center font-inter font-semibold py-10">
          3. You get an statiscal report of your weaknesses
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 py-10 gap-10">
          <Component/>
          <ChartBarMultiple/>
          <ChartLineInteractive/>
          <p className=" transEffectText1 text-2xl md:text-5xl max-w-2xl tracking-tighter py-10 font-semibold text-LightCutsieGrayMiau custom-blur-border">
            With our tailored analytics, you’ll discover which techniques resonate most, 
            where your creative process could be streamlined, 
            and exactly how to refine your approach for maximum impact...
          </p>

        </div>
        <h2 className="transEffectText1 text-3xl md:text-5xl max-w-xl tracking-tighter text-center font-inter font-semibold py-5">
          4. Mass apply to hundreds of jobs pulled from LinkedIn tailored to your skillset
        </h2>

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center justify-items-center custom-blur-border text-5xl text-LightCutsieGrayMiau custom-blur-border font-semibold py-10">
            <ScrollVelocity
            texts={['One', 'Click']} 
            velocity={100} 
            className="custom-scroll-text"/>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You are just one step away from succeding</AlertDialogTitle>
              <AlertDialogDescription>
                Sign Up today... You won&apos;t regret this action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue</AlertDialogCancel>
              <AlertDialogCancel>Continue</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <div className="flex item-center justify-center transEffectText1 py-10">
          <div className="relative">
            <MagnetLines/>
          </div>
          <div className="absolute mt-17 text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-inter font-semibold py-7 custom-blur-border">
          Are you trying to kill this application season?
          <p className="text-2xl md:text-5xl max-w-2xl tracking-tighter py-10 text-LightCutsieGrayMiau">The best tool to help you is one Sign Up away</p>
          </div>
        </div>
        
      </div> 
    <div/>


      {/*FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER-----------------------*/}

      <footer className="
        flex
        items-center justify-center
        text-Secondary
        opacity-50
        font-thin
        text-sm 
        mt-10
        py-1">
        2025 ReCueCareer. Inc. All rights reserved.
      </footer>
    </div>      
  );
}

