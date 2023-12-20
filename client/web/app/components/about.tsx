export const About = () => {
  return (
    <div className="bg-main flex flex-col">
      <div className="h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section w-full justify-evenly flex items-center space-x-56">
          <div className="purpose flex flex-col space-y-4 items-start">
            <h2 className="font-display text-highlight text-[80px]">
              Why Does This Exist
            </h2>
            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
              The Purpose of this project is to build a community of people who
              are willing to collaborate and help each other out with the ever
              pressing issue of assignments, for me personally i feel that i
              don't learn much from them and they pile up on me which does
              nothing to alleviate my stress.
            </p>

            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
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
          <div className="image w-[450px]">
            <img src="/assets/about.png" alt="" />
          </div>
        </div>
      </div>
      <div className="h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section w-full justify-around flex flex-row-reverse items-center ">
          <div className="purpose flex flex-col space-y-4 items-start">
            <h2 className="font-display text-highlight text-[80px]">
              What’s in store
            </h2>
            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
              In the future i hope to make a mobile version of this that’s more
              accessible to everyone and scale up this application to include
              other years and branches. i also intend to creep in features such
              as markdown integration for easier sharing of code snippets, a
              notes section for just material related to subjects, a tests
              section with old test papers, more themes and maybe even a fun
              corner to relax while surfing the site.
            </p>

            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
              I hope to get more developers on board so that i can make this
              project into something truly remarkable and at the same time help
              out my peers through this persistent stress. things are still
              rough around the edges but i thoroughly enjoyed making this and i
              hope everyone who visits this site finds some use for it.
            </p>
          </div>
          <div className="image w-[450px]">
            <img src="/assets/about-2.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section w-full justify-around flex items-center ">
          <div className="purpose flex flex-col space-y-10 items-start">
            <h2 className="font-display text-highlight text-[80px]">
              Drop me a Mail
            </h2>
            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
              Feedback is invaluable to me and i hope to improve the experience
              of using this application while development is ongoing, i’d love
              to heard your thoughts on the site and if and how its been helping
              you out.
            </p>

            <p className="font-base text-highlightSecondary w-[800px] text-2xl">
              if you have any suggesstions regarding what i should implement
              next feel free to drop them as well, you can also use this to
              request assignments or request to contribute to the site, i would
              greatly appreciate your input.
            </p>
            <div className="w-full h-16 bg-highlightSecondary flex justify-center items-center rounded-3xl ">
              <a
                href="mailto:kaizenklass5@gmail.com"
                className="flex items-center space-x-6"
              >
                <img src="/assets/email.png" className="w-12" alt="" />
                <p className="text-main text-3xl font-base">Email me now!</p>
              </a>
            </div>
          </div>
          <div className="image w-[450px]">
            <img src="/assets/about-3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
