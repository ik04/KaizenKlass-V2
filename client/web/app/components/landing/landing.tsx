import { Link } from "@remix-run/react";

export const Landing = () => {
  return (
    <section className="bg-primary bg-[url('/assets/KaizenKlassBg.webp')] min-h-screen flex items-center bg-no-repeat bg-cover p-4 md:p-16">
      <div className="flex flex-col items-center max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        <h1 className="font-display text-highlight text-center text-5xl md:text-9xl">
          Kaizen Klass
        </h1>
        <p className="text-highlightSecondary font-base text-center text-base md:text-4xl">
          Learn, Grow and Overcome Assignments
        </p>
        <div className="grid grid-cols-2 gap-5 md:mt-10 mt-5">
          <Link
            to={"/contribute"}
            role="button"
            className="cursor-pointer border border-highlight text-highlight md:w-60 text-base w-32 md:text-3xl h-10 md:h-20 justify-center items-center flex rounded-full font-base hover:bg-highlight hover:text-primary transition-all duration-300 ease-in-out focus:bg-highlight focus:text-primary"
          >
            Contribute
          </Link>
          <Link
            to={"/subjects"}
            role="button"
            className="cursor-pointer border border-highlight bg-highlight text-primary md:w-60 text-base w-32 md:text-3xl h-10 md:h-20 justify-center items-center flex rounded-full font-base hover:bg-primary hover:text-highlight transition-all duration-300 ease-in-out focus:bg-primary focus:text-highlight"
          >
            Check it out
          </Link>
        </div>
      </div>
    </section>
  );
};
