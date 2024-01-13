import React from "react";

export const About = () => {
  return (
    <div className="bg-main flex flex-col space-y-9">
      <div className="md:h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section md:w-full md:justify-evenly md:flex-row flex flex-col-reverse mt-5 md:mt-0 justify-center items-center md:items-center md:space-x-56">
          <div className="purpose flex flex-col p-4 md:p-0 space-y-6 md:space-y-4 md:items-start">
            <h2 className="font-display text-center text-highlight md:mb-5 text-3xl md:text-[80px]">
              For Contributors{" "}
            </h2>
            <p className="font-base text-highlightSecondary md:w-[800px] text-justify text-sm md:text-2xl">
              Description field is made to allows addition of links, so if you
              have no content to add you can add a link to the source for easier
              access.{" "}
            </p>

            <p className="font-base text-highlightSecondary md:w-[800px] text-justify text-sm md:text-2xl">
              the content field only accepts drive share links and converts the
              share link to download link, to edit you must add a new drive
              link.
            </p>
          </div>
          <div className="image md:w-[450px] w-[250px]">
            <img src="/assets/contributor.png" alt="" />
          </div>
        </div>
      </div>
      <div className="md:h-screen bg-main flex overflow-auto justify-center items-center">
        <div className="about-section md:w-full md:justify-around p-4 md:flex-row-reverse md:items-center flex flex-col-reverse items-center justify-center">
          <div className="purpose flex flex-col space-y-5 md:space-y-4 items-center md:items-start">
            <h2 className="font-display text-highlight mt-3 md:mt-0 md:mb-3 text-3xl md:text-[80px]">
              for Crosscheckers:
            </h2>
            <p className="font-base text-highlightSecondary md:w-[800px] text-justify md:text-start text-sm md:text-2xl">
              Title and Subject are required fields and must be filled.
              Description field is made to allows addition of links, so if you
              have no content to add you can add a link to the source for easier
              access. the content field only accepts drive share links and
              converts the share link to download link, to edit you must add a
              new drive link. (same as the above)
            </p>

            <p className="font-base text-highlightSecondary md:w-[800px] text-justify md:text-start text-sm md:text-2xl">
              Select the deadline of the assignment, the time of the deadline is
              12am so select likewise. The link is used to link the assignment
              to its source, it dosen’t have to be the classroom link but you
              can link it to anything else as well. innapropriate links will be
              moderated and the account will be revoked.
            </p>
          </div>
          <div className="image md:w-[450px] w-[250px]">
            <img src="/assets/crosschecker.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
