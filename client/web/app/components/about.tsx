export const About = () => {
  return (
    <div className="bg-main flex flex-col space-y-9">
      <div className="md:h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section md:w-full md:justify-evenly md:flex-row flex flex-col-reverse mt-5 md:mt-0 justify-center items-center md:items-center md:space-x-56">
          <div className="purpose flex flex-col p-4 md:p-0 space-y-6 md:space-y-4 md:items-start">
            <h2 className="font-display text-center text-highlight md:mb-5 text-3xl md:text-[80px]">
              Why Does This Exist
            </h2>
            <p className="font-base text-highlightSecondary md:w-[800px] text-justify text-sm md:text-2xl">
              The Purpose of this project is to build a community of people who
              are willing to collaborate and help each other out with the ever
              pressing issue of assignments, for me personally i feel that i
              don't learn much from them and they pile up on me which does
              nothing to alleviate my stress.
            </p>

            <p className="font-base text-highlightSecondary md:w-[800px] text-justify text-sm md:text-2xl">
              I know that this problem isn't limited to myself and so i want to
              build a platform to combat these issues. i'll also creep in
              features to help out students generally as well as point them to
              organizations that can help them grow, in my opinion the only
              reason we do assignments is to get by and get marks. Its a waste
              of our time and its better invested in protecting our careers via
              upskilling. Join the Community and make life easier for everyone
              involved :)
            </p>
          </div>
          <div className="image md:w-[450px] w-[250px]">
            <img src="/assets/about.png" alt="" />
          </div>
        </div>
      </div>
      <div className="md:h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section md:w-full md:justify-around p-4 md:flex-row-reverse md:items-center flex flex-col-reverse items-center justify-center">
          <div className="purpose flex flex-col space-y-5 md:space-y-4 items-center md:items-start">
            <h2 className="font-display text-highlight mt-3 md:mt-0 md:mb-3 text-3xl md:text-[80px]">
              What’s in store
            </h2>
            <p className="font-base text-highlightSecondary md:w-[800px] text-justify md:text-start text-sm md:text-2xl">
              In the future i hope to make a mobile version of this that’s more
              accessible to everyone and scale up this application to include
              other years and branches. i also intend to creep in features such
              as markdown integration for easier sharing of code snippets, a
              notes section for just material related to subjects, a tests
              section with old test papers, more themes and maybe even a fun
              corner to relax while surfing the site.
            </p>

            <p className="font-base text-highlightSecondary md:w-[800px] text-justify md:text-start text-sm md:text-2xl">
              I hope to get more developers on board so that i can make this
              project into something truly remarkable and at the same time help
              out my peers through this persistent stress. things are still
              rough around the edges but i thoroughly enjoyed making this and i
              hope everyone who visits this site finds some use for it.
            </p>
          </div>
          <div className="image md:w-[450px] w-[250px]">
            <img src="/assets/about-2.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="md:h-screen bg-main flex overflow-auto md:justify-center md:items-center">
        <div className="about-section md:w-full md:justify-around flex flex-col-reverse md:flex-row items-center p-3 md:p-0 justify-center md:items-center space-y-5">
          <div className="purpose flex flex-col md:space-y-10 space-y-4 md:items-start items-center">
            <h2 className="font-display text-highlight md:text-[80px] text-3xl">
              Drop me a Mail
            </h2>
            <p className="font-base text-highlightSecondary md:w-[800px] text-center md:text-start text-sm md:text-2xl">
              Feedback is invaluable to me and i hope to improve the experience
              of using this application while development is ongoing, i’d love
              to heard your thoughts on the site and if and how its been helping
              you out.
            </p>

            <p className="font-base text-highlightSecondary md:w-[800px] text-center md:text-start text-sm md:text-2xl">
              if you have any suggesstions regarding what i should implement
              next feel free to drop them as well, you can also use this to
              request assignments or request to contribute to the site, i would
              greatly appreciate your input.
            </p>
            <div className="md:w-full p-4 md:p-0 md:h-16 h-10 bg-highlightSecondary flex justify-center items-center rounded-3xl ">
              <a
                href="mailto:kaizenklass5@gmail.com"
                className="flex items-center space-x-3 md:space-x-6"
              >
                <img src="/assets/email.png" className="md:w-12 w-5" alt="" />
                <p className="text-main md:text-3xl text-xl font-base">
                  Email me now!
                </p>
              </a>
            </div>
          </div>
          <div className="image md:w-[450px] w-[250px]">
            <img src="/assets/about-3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
