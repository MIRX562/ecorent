import React from "react";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-12 md:py-24 lg:py-32 bg-white dark:bg-background"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Semua yang perlu kamu tahu tentang EcoRent.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4 py-12">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              Bagaimana EcoRent melindungi barang saya?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Kami menawarkan asuransi opsional untuk semua penyewaan,
              memverifikasi semua pengguna dengan pengecekan ID, dan memiliki
              sistem deposit yang aman untuk memastikan barang kamu terlindungi.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              Bagaimana jika barang saya rusak?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Kebijakan perlindungan kami mencakup kerusakan di luar keausan
              normal. Kami akan membantu kamu mendapatkan kompensasi untuk
              perbaikan atau penggantian.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              Bagaimana cara kerja pembayaran?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Pembayaran diproses dengan aman melalui platform kami. Dana akan
              ditahan hingga masa sewa selesai, kemudian ditransfer ke pemilik
              setelah dikurangi biaya layanan kecil kami.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              Apakah EcoRent tersedia di daerah saya?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Kami terus berkembang pesat! Saat ini, kami tersedia di sebagian
              besar kota besar di AS dan beberapa lokasi internasional pilihan.
              Masukkan kode pos Anda saat mendaftar untuk memeriksa
              ketersediaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
