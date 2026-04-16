import Image from "next/image";

const ImgSection = () => {
  return (
    <section className="  relative w-full min-h-[45dvh] h-[55dvh] sm:h-[65dvh] md:h-screen overflow-hidden">
      <Image
        src="/HeroImg.png"
        alt="Portfolio hero"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
};

export default ImgSection