import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import CanvasCursor from "@/components/edil-ozi/canvas-cursor";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-black overflow-hidden">
        {/* Canvas Cursor Background */}
        <CanvasCursor />

        <div className="relative z-10">
          <div className="container py-24 lg:py-32">
            {/* Mystery Message Banner */}
            <div className="flex justify-center">
              <AnimatedGradientText>
                <p>Discover the Secrets</p>
                <span className="py-1 px-1 ml-2 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={10}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </AnimatedGradientText>
            </div>
            {/* End Mystery Message Banner */}

            {/* Title */}
            <div className="mt-5 max-w-2xl text-center mx-auto">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Unveil the Mystery!
              </h1>
            </div>
            {/* End Title */}

            {/* Subtitle */}
            <div className="mt-5 max-w-3xl text-center mx-auto">
              <p className="text-xl text-muted-foreground">
                Dive into anonymous messages and uncover hidden truths. Share
                your thoughts, secrets, and stories in complete anonymity.
              </p>
            </div>
            {/* End Subtitle */}

            {/* Buttons */}
            <div className="mt-8 gap-3 flex justify-center">
              <Link href="/dashboard" passHref>
                <ShimmerButton
                  className="shadow-3xl"
                  shimmerColor="#000"
                  shimmerSize="0.12em"
                  background="#fff"
                >
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black lg:text-sm">
                    See Messages
                  </span>
                </ShimmerButton>
              </Link>

              <Link href="/learn-more" passHref>
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                    Learn More
                  </span>
                </ShimmerButton>
              </Link>
            </div>

            {/* End Buttons */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
