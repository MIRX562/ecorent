import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-cyan-600 "
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Siap untuk mulai berbagi?
            </h2>
            <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Bergabung dengan comunitas kami sekarang dan mulai berbagi dan
              berhemat.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="text-teal-300 bg-white">
              Ayo Mulai
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-teal-400">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
