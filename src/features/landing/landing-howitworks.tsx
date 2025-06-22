import Image from "next/image";
import React from "react";

export default function HowitworksSection() {
  return (
    <section
      id="how-it-works"
      className="py-12 md:py-24 lg:py-32 bg-teal-300 dark:bg-teal-950/10"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-950/40 px-3 py-1 text-sm text-teal-700 dark:text-teal-300">
              Cara Kerja
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Mudah. Lancar. Berkelanjutan.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Menyewa barang seharusnya semudah membelinya. Begini cara EcoRent
              mewujudkannya.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-xl font-bold text-teal-700 dark:text-teal-300">
              1
            </div>
            <h3 className="text-xl font-bold">Daftarkan Barangmu</h3>
            <p className="text-muted-foreground">
              Ambil foto, tentukan harga, dan jelaskan barangmu. Cuma butuh
              kurang dari 5 menit.
            </p>
            <Image
              src="/h-1.png"
              width={300}
              height={200}
              alt="Seseorang mendaftarkan barang di EcoRent"
              className="rounded-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/40 text-xl font-bold text-cyan-700 dark:text-cyan-300">
              2
            </div>
            <h3 className="text-xl font-bold">Berhubungan & Atur Janji</h3>
            <p className="text-muted-foreground">
              Ngobrol dengan penyewa atau pemilik, sepakati
              pengambilan/pengiriman, lalu konfirmasi pesananmu.
            </p>
            <Image
              src="/h-2.png"
              width={300}
              height={200}
              alt="Orang-orang berhubungan di EcoRent"
              className="rounded-lg h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-xl font-bold text-teal-700 dark:text-teal-300">
              3
            </div>
            <h3 className="text-xl font-bold">Sewa & Kembalikan</h3>
            <p className="text-muted-foreground">
              Gunakan barang sesuai jangka waktu yang disepakati, lalu
              kembalikan dalam kondisi yang sama seperti saat kamu menerimanya.
            </p>
            <Image
              src="/h-3.png"
              width={300}
              height={200}
              alt="Seseorang mengembalikan barang sewaan"
              className="rounded-lg h-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
