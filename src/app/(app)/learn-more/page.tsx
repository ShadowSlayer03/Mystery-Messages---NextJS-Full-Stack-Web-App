"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Meteors from "@/components/magicui/meteors";
import howToUse from "@/helpers/howToUse";
import CardHoverEffect from "@/components/edil-ozi/card-hover-effect";
import OrbitingCircles from "@/components/magicui/orbiting-circles";

const LearnMore = () => {
  return (
    <div className="w-full relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-black overflow-hidden">
      <Meteors number={30} />
      <div className="h-[100vh] relative z-10 max-w-3xl text-center text-white">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          How Mystery Messages Works
        </h1>
        <p className="mt-5 text-xl text-muted-foreground">
          Discover the simple steps to start sending and receiving anonymous
          messages with Mystery Messages.
        </p>

        <div className="mt-8 text-left space-y-8">
          <CardHoverEffect items={howToUse} />
        </div>
      </div>
      <div className="h-[80vh] w-[85vw] relative z-10 text-center text-white mt-10 flex flex-col items-center justify-center overflow-hidden border rounded-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          Tech/Tools Used
        </span>

        {/* 1st Orbit (Inner Circle) */}
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          duration={20}
          delay={0}
          radius={85}
        >
          <Icons.zod />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          duration={20}
          delay={10}
          radius={85}
        >
          <Icons.reactHookForms />
        </OrbitingCircles>

        {/* 2nd Orbit (Middle Circle) */}
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          duration={25}
          delay={15}
          radius={145}
        >
          <Icons.mongoDB />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          duration={25}
          delay={28}
          radius={145}
        >
          <Icons.googleGemini />
        </OrbitingCircles>

        {/* 3rd Orbit (Outer Circle) */}
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          radius={200}
          duration={30}
          delay={5}
          reverse
        >
          <Icons.nextJS />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          radius={200}
          duration={30}
          delay={20}
          reverse
        >
          <Icons.shadCN />
        </OrbitingCircles>
      </div>
    </div>
  );
};

const Icons = {
  zod: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 256 203"
      className="bg-teal-300 rounded-full w-full h-full p-2"
    >
      <defs>
        <filter
          id="logosZod0"
          width="105.2%"
          height="106.5%"
          x="-2.2%"
          y="-2.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx={1}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={2}
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0"
          ></feColorMatrix>
        </filter>
        <path
          id="logosZod1"
          fill="#000"
          d="M200.42 0H53.63L0 53.355l121.76 146.624l9.714-10.9L252 53.857zm-5.362 12.562l39.84 41.6l-112.8 126.558L17 54.162l41.815-41.6z"
        ></path>
      </defs>
      <g transform="translate(2 1.51)">
        <path
          fill="#18253f"
          d="M58.816 12.522h136.278l39.933 41.691l-112.989 126.553L16.957 54.213z"
        ></path>
        <path
          fill="#274d82"
          d="M149.427 150.875H96.013l-24.124-29.534l68.364-.002l.002-4.19h39.078z"
        ></path>
        <path
          fill="#274d82"
          d="M223.56 42.323L76.178 127.414l-19.226-24.052l114.099-65.877l-2.096-3.631l30.391-17.546zm-78.964-29.759L33.93 76.457L16.719 54.972l74.095-42.779z"
        ></path>
        <use filter="url(#logosZod0)" href="#logosZod1"></use>
        <use fill="#3068b7" href="#logosZod1"></use>
      </g>
    </svg>
  ),
  reactHookForms: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.775 17.348H5.806a.282.282 0 1 0 0 .563h4.97a.282.282 0 1 0 0-.563m7.32 0h-4.969a.282.282 0 1 0 0 .563h4.969a.282.282 0 0 0 0-.563m-7.334-6.475H5.807a.282.282 0 1 0 0 .563h4.954a.282.282 0 1 0 0-.563m7.32 0h-4.955a.282.282 0 1 0 0 .563h4.955a.282.282 0 0 0 0-.563m.552-9.2h-4.341a2.404 2.404 0 0 0-4.58 0H5.366A3.097 3.097 0 0 0 2.27 4.769v16.134A3.097 3.097 0 0 0 5.367 24h13.266a3.097 3.097 0 0 0 3.096-3.097V4.77a3.097 3.097 0 0 0-3.096-3.096m-8.705.563a.28.28 0 0 0 .281-.223a1.841 1.841 0 0 1 3.598 0a.28.28 0 0 0 .282.223h1.514V4.08a.845.845 0 0 1-.844.844H9.255a.845.845 0 0 1-.844-.844V2.236Zm11.238 18.667c0 1.4-1.134 2.534-2.533 2.534H5.367a2.534 2.534 0 0 1-2.533-2.534V4.77a2.533 2.533 0 0 1 2.533-2.533h2.48V4.08c0 .777.63 1.407 1.408 1.407h5.49c.777 0 1.407-.63 1.407-1.407V2.236h2.48c1.4 0 2.534 1.134 2.534 2.533z"
      ></path>
    </svg>
  ),
  mongoDB: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 11 24"
      className="bg-[#001e29] rounded-full p-2"
    >
      <path
        fill="green"
        d="M10.562 9.518C9.299 3.958 6.32 2.131 6 1.432A8.7 8.7 0 0 1 5.289.06L5.267 0c0 .019 0 .031-.005.049v.144v-.001v.021l.001.011l-.001.011v.052l-.009.05V.4h-.005v.016h-.036v.057h-.006v.046h-.024v.064L5.159.6l-.005.007v.022h-.005v.018h-.006v.045h-.006v.019h-.005v.018h-.005v.022h-.045v.015h-.005v.019h-.005V.8h-.006v.023h-.005v.013a.2.2 0 0 0-.049.034l-.009.01c-.003.004 0 0 0 0v.058h-.005V.93h-.005v.01h-.005v.008h-.005V.97h-.061v.01h-.01V1h-.03v.01h-.005v.006h-.01v.01h-.03v.006h-.005v.058h-.006v.01h-.005v.006h-.005v.006l-.014.016l-.012.01l-.039.032l-.022.017l-.049.039l-.074.062q-.084.07-.186.159q-.254.223-.6.568l-.015.015a13.7 13.7 0 0 0-3.729 9.059v.018a10 10 0 0 0 .007 1.174l-.001-.03v.009a10.85 10.85 0 0 0 1.456 4.808l-.028-.052c.308.54.614.999.948 1.435l-.022-.03a13 13 0 0 0 2.483 2.503l.031.023a8.2 8.2 0 0 1 .4 2.79v-.011l.644.215a12 12 0 0 1 .059-2.582l-.006.061c.065-.257.186-.48.35-.664l-.001.002c.298-.213.559-.424.806-.651l-.006.006c.018-.019.028-.036.044-.054a11.4 11.4 0 0 0 3.614-8.337q-.002-1.203-.239-2.337l.013.074z"
      ></path>
    </svg>
  ),
  googleGemini: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className="bg-white rounded-full w-full h-full p-2"
    >
      <path
        fill="#567ecb"
        d="M24 12.024c-6.437.388-11.59 5.539-11.977 11.976h-.047C11.588 17.563 6.436 12.412 0 12.024v-.047C6.437 11.588 11.588 6.437 11.976 0h.047c.388 6.437 5.54 11.588 11.977 11.977z"
      ></path>
    </svg>
  ),
  nextJS: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6em"
      height="6em"
      viewBox="0 0 128 128"
    >
      <circle className="border border-white" cx={64} cy={64} r={64}></circle>
      <path
        fill="url(#deviconNextjs0)"
        d="M106.317 112.014L49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64 64 0 0 0 6.763-5.209"
      ></path>
      <path
        fill="url(#deviconNextjs1)"
        d="M81.778 38.4h8.533v51.2h-8.533z"
      ></path>
      <defs>
        <linearGradient
          id="deviconNextjs0"
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset={1} stopColor="#fff" stopOpacity={0}></stop>
        </linearGradient>
        <linearGradient
          id="deviconNextjs1"
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset={1} stopColor="#fff" stopOpacity={0}></stop>
        </linearGradient>
      </defs>
    </svg>
  ),
  shadCN: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 24 24"
      className="bg-black rounded-full p-2"
    >
      <path
        fill="white"
        d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305"
      ></path>
    </svg>
  ),
};

export default LearnMore;
