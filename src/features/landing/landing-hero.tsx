"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Recycle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-teal-50 dark:from-background dark:to-background/90 ">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4 motion-translate-x-in-[0%] motion-translate-y-in-[15%] motion-opacity-in-[10%]">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none xl:text-7xl/none">
                Mari Berbagi,{" "}
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Kurangi Membeli.
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Sewakan barang-barang tak terpakai Anda dan temukan yang Anda
                butuhkan tanpa harus membeli baru. Hemat uang, kurangi limbah,
                dan bangun komunitas.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 w-full">
                  Cari Barang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/20"
                onClick={(e) => {
                  e.preventDefault();
                  const featuresSection = document.getElementById("features");
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
            <div className="mt-6 flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 text-xs font-medium">
                    JD
                  </div>
                  <div className="h-8 w-8 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700 text-xs font-medium">
                    SM
                  </div>
                  <div className="h-8 w-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 text-xs font-medium">
                    RK
                  </div>
                </div>
                <span className="ml-4 text-muted-foreground">
                  Bergabung dengan 10,000+ pengguna
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center motion-delay-300 motion-translate-y-in-[10%] motion-opacity-in-[0%]">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl md:h-[450px] lg:h-[550px] bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-600 dark:to-cyan-600 p-1">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md p-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">
                      Temukan yang anda butuhkan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cari dari ribuan barang yang tersedia didekat anda
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Peralatan Camping, perkakas, kamera..."
                      className="w-full bg-background pl-8 pr-20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      className="absolute right-1 top-1 h-7 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                      onClick={() => {
                        if (searchQuery.trim()) {
                          window.location.href = `/marketplace?search=${encodeURIComponent(
                            searchQuery.trim()
                          )}`;
                        }
                      }}
                    >
                      Cari
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                      onClick={() =>
                        (window.location.href = "/marketplace?search=tools")
                      }
                    >
                      Perkakas
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                      onClick={() =>
                        (window.location.href = "/marketplace?search=camping")
                      }
                    >
                      Camping
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                      onClick={() =>
                        (window.location.href =
                          "/marketplace?search=electronics")
                      }
                    >
                      Alat Elektronik
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                      onClick={() =>
                        (window.location.href = "/marketplace?search=sports")
                      }
                    >
                      Olahraga
                    </Button>
                  </div>
                </div>
              </div>
              <Image
                src="/hero.jpeg"
                width={750}
                height={550}
                alt="EcoRent app interface showing people renting items"
                className="rounded-xl h-full"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 mx-auto flex max-w-md items-center justify-between rounded-lg border bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Recycle className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">
                    Pilihan yang Berkelanjutan
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Mengurangi 5,000+ pemebelian baru bulan lalu
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-teal-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
