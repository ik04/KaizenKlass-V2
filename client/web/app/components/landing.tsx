export const Landing = () => {
  return (
    <div className="bg-primary bg-[url('/assets/KaizenKlassBg.png')] h-screen flex justify-center items-center">
      <div className="hero flex flex-col items-center">
        <h1 className="font-display text-highlight text-[180px]">
          Kaizen Klass
        </h1>
        <p className="text-highlightSecondary font-base text-center text-4xl">
          Learn, Grow and Overcome Assignments
        </p>
        <div className="buttons flex space-x-5 mt-10">
          <div className="cursor-default border border-highlight text-highlight w-[280px] h-[75px] justify-center items-center flex rounded-full font-base text-3xl">
            Contribute
          </div>
          <div className="cursor-default border border-highlight bg-highlight text-primary w-[280px] h-[75px] justify-center items-center flex rounded-full font-base text-3xl">
            Check it out
          </div>
        </div>
      </div>
    </div>
  );
};
