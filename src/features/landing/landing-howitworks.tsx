import Image from "next/image";
import React from "react";

export default function HowitworksSection() {
  return (
    <section
      id="how-it-works"
      className="py-12 md:py-24 lg:py-32 bg-teal-200 dark:bg-teal-950/10"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple. Seamless. Sustainable.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Renting items should be as easy as buying them. Here&apos;s how
              EcoRent makes it happen.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-xl font-bold text-teal-700 dark:text-teal-300">
              1
            </div>
            <h3 className="text-xl font-bold">List Your Items</h3>
            <p className="text-muted-foreground">
              Take photos, set your price, and describe your item. It takes less
              than 5 minutes.
            </p>
            <Image
              src="/h-1.png"
              width={300}
              height={200}
              alt="Person listing items on EcoRent"
              className="rounded-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/40 text-xl font-bold text-cyan-700 dark:text-cyan-300">
              2
            </div>
            <h3 className="text-xl font-bold">Connect & Arrange</h3>
            <p className="text-muted-foreground">
              Chat with renters or owners, agree on pickup/delivery, and confirm
              your booking.
            </p>
            <Image
              src="/h-2.png"
              width={300}
              height={200}
              alt="People connecting on EcoRent"
              className="rounded-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-xl font-bold text-teal-700 dark:text-teal-300">
              3
            </div>
            <h3 className="text-xl font-bold">Rent & Return</h3>
            <p className="text-muted-foreground">
              Use the item for your agreed period, return it in the same
              condition you received it.
            </p>
            <Image
              src="/h-3.png"
              width={300}
              height={200}
              alt="Person returning rented item"
              className="rounded-lg h-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
