import { Star } from "lucide-react";
import React from "react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of happy users who are already sharing and saving
              with EcoRent.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-between space-y-4 rounded-xl border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-teal-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "I made $350 last month renting out my camping gear that was
                just collecting dust in my garage. Amazing concept!"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-sm font-medium">
                JD
              </div>
              <div>
                <h4 className="text-sm font-medium">James D.</h4>
                <p className="text-xs text-muted-foreground">Portland, OR</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-xl border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-teal-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "Rented a high-end camera for my vacation instead of buying one.
                Saved hundreds and got exactly what I needed!"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-sm font-medium">
                SM
              </div>
              <div>
                <h4 className="text-sm font-medium">Sarah M.</h4>
                <p className="text-xs text-muted-foreground">Austin, TX</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-xl border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-teal-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "As a minimalist, EcoRent helps me access things I need
                occasionally without owning them. Game changer!"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-sm font-medium">
                RK
              </div>
              <div>
                <h4 className="text-sm font-medium">Ryan K.</h4>
                <p className="text-xs text-muted-foreground">Chicago, IL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
