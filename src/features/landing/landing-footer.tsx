import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 px-4">
      <div className="container flex flex-col gap-6 py-8 md:py-12 mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-3 lg:max-w-sm">
            <div className="flex items-center gap-2">
              <Image alt="logo" src="./icon0.svg" height={24} width={24} />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                EcoRent
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sewa yang kamu butuhkan. Sewakan yang tidak kamu pakai.
              Bergabunglah dengan ekonomi sirkular dan bantu wujudkan masa depan
              yang lebih berkelanjutan.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
            {/* <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EcoRent. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
