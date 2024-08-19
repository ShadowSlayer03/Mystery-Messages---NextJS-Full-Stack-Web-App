import Link from "next/link";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const FacebookIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const XIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white py-8 md:py-12 w-full">
      <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Important Links</h3>
          <nav className="flex flex-col space-y-1">
            <Link href="/" className="text-sm hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="/sign-in" className="text-sm hover:underline" prefetch={false}>
              Login
            </Link>
            <Link href="/sign-up" className="text-sm hover:underline" prefetch={false}>
              Sign Up
            </Link>
            <Link href="/learn-more" className="text-sm hover:underline" prefetch={false}>
              Learn More
            </Link>
            <Link href="/dashboard" className="text-sm hover:underline" prefetch={false}>
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Social</h3>
          <nav className="flex flex-col space-y-1">
            <Link
              href="#"
              className="flex items-center space-x-2 text-sm hover:underline"
              prefetch={false}
            >
              <FacebookIcon className="h-5 w-5" />
              <span>Facebook</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-sm hover:underline"
              prefetch={false}
            >
              <XIcon className="h-5 w-5" />
              <span>X</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-sm hover:underline"
              prefetch={false}
            >
              <MailIcon className="h-5 w-5" />
              <span>Gmail</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-sm hover:underline"
              prefetch={false}
            >
              <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-sm text-[#b3b3b3]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl
            aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-sm text-[#b3b3b3]">
            123 Main Street
            <br />
            Anytown, USA 12345
            <br />
            Phone: (123) 456-7890
            <br />
            Email: mysterymessages@gmail.com
          </p>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-sm text-[#b3b3b3]">
        &copy; 2024 Mystery Messages. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
