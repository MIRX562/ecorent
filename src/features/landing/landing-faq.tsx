import React from "react";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to know about EcoRent.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4 py-12">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              How does EcoRent protect my items?
            </h3>
            <p className="mt-2 text-muted-foreground">
              We offer optional insurance for all rentals, verify all users with
              ID checks, and have a secure deposit system to ensure your items
              are protected.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              What if someone damages my item?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Our protection policy covers damages beyond normal wear and tear.
              We'll help you get compensated for repairs or replacement.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">How does payment work?</h3>
            <p className="mt-2 text-muted-foreground">
              Payments are processed securely through our platform. Funds are
              held until the rental is complete, then transferred to the owner
              minus our small service fee.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              Is EcoRent available in my area?
            </h3>
            <p className="mt-2 text-muted-foreground">
              We're rapidly expanding! Currently, we're available in most major
              US cities and select international locations. Enter your zip code
              during signup to check availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
