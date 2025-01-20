import Image from "next/image";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <Image
        className="object-contain rounded-md"
        src="/images/too-fast.png"
        alt="too-fast"
        width={500}
        height={500}
      />
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100 pt-5">
        Error 429 - Too many requests!
      </h1>
      <p className="text-light-100 w-[500px] text-center p-5">
        Looks like you&apos;ve been a little too eager. We have put a temporary
        pause on your exictement. <br /> Try again after some time.
      </p>
    </main>
  );
};
export default Page;
