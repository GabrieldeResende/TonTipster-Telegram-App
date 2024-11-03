import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-sm items-center justify-center py-10 px-4 bg-black text-white">
      <div className="flex flex-col items-center self-center justify-self-center mb-auto mt-auto">
        <div className="flex flex-row items-center">
          <Image src="/assets/TonytipsterLogo.jpeg" alt="Tontipster Logo" className="rounded-xl" width={120} height={150} />
          <div className="flex flex-col items-left pl-2">
            <h1 className="text-4xl font-light">TONY</h1>
            <h1 className="text-4xl font-light">TIPSTER</h1>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Link href="/home">
          <button className="bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-5 rounded-lg w-full mb-3">SPORTS</button>
        </Link>
        <Link href="/home">
          <button className="bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-5 rounded-lg w-full mb-3">ESPORTS (COMING SOON)</button>
        </Link>
        <Link href="/home">
          <button className="bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-5 rounded-lg w-full mb-3">CASINO (COMING SOON)</button>
        </Link>
      </div>
    </main>
  );
}
