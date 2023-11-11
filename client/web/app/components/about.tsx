export const About = () => {
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="about-section w-full justify-evenly flex items-center space-x-56">
        <div className="content flex flex-col space-y-4 items-start">
          <h2 className="font-display text-highlight text-[80px]">
            Why Does This Exist
          </h2>
          <p className="font-base text-highlightSecondary w-[800px] text-2xl">
            The Purpose of this project is to build a community of people who
            are willing to collaborate and help each other out with the ever
            pressing issue of assignments, for me personally i feel that i don't
            learn much from them and they pile up on me which does nothing to
            alleviate my stress.
          </p>

          <p className="font-base text-highlightSecondary w-[800px] text-2xl">
            I know that this problem isn't limited to myself and so i want to
            build a platform to combat these issues. i'll also creep in festures
            to help out students generally as well as point them to
            organizations that can help them grow, in my opinion the only reason
            we do assignments is to get by and get marks. Its a waste of our
            time and its better invested in protecting our careers via
            upskilling. Join the Community and make life easier for everyone
            involved :)
          </p>
        </div>
        <div className="image w-[450px]">
          <img src="/assets/about.png" alt="" />
        </div>
      </div>
    </div>
  );
};
