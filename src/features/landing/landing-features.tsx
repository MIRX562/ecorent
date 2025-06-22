import { DollarSign, Leaf, ShieldCheck } from "lucide-react";
import React from "react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 motion-preset-slide-up-md">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              Fitur
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Kenapa Pilih EcoRent?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Platform kami membuat kegiatan menyewa dan meminjam jadi lebih
              mudah, aman, dan berkelanjutan.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-start space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40">
              <Leaf className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Ramah Lingkungan</h3>
            <p className="text-muted-foreground">
              Kurangi limbah dan jejak karbon Anda dengan berbagi sumber daya,
              daripada membeli yang baru.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/40">
              <DollarSign className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold">Hemat</h3>
            <p className="text-muted-foreground">
              Dapatkan penghasilan dari barang yang jarang kamu pakai dan
              berhemat dengan menyewa, alih-alih membeli.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40">
              <ShieldCheck className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Aman & Terpercaya</h3>
            <p className="text-muted-foreground">
              Pengguna terverifikasi, pembayaran aman, dan pilihan asuransi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
