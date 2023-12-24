import React, { useState } from "react";

export const ResourceCard = ({
  title,
  description,
  link,
  type,
}: {
  title: string;
  description: string | undefined;
  link: string;
  type: number;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Display full description if 'showFullDescription' is true, otherwise show truncated description
  const displayDescription = showFullDescription
    ? description
    : description?.substring(0, 80);

  let icon = "/assets/diamond.svg";
  switch (type) {
    case 0:
      icon = "/assets/diamond.svg";
      break;
    case 1:
      icon = "/assets/treasureMap.png";
      break;
    default:
      icon = "/assets/diamond.svg";
      break;
  }

  return (
    <div className="bg-mainLighter md:flex w-full flex md:flex-col md:justify-between md:items-center md:p-10 md:rounded-2xl md:w-80 md:h-96 md:overflow-hidden">
      <div className="md:h-1/2 md:flex md:items-center md:justify-center">
        <img src={`${icon}`} className="md:w-32" alt="" />
      </div>
      <div className="md:text-center md:flex md:flex-col">
        <h1 className="font-base text-highlightSecondary md:text-2xl md:font-bold">
          {title}
        </h1>
        {description != undefined && (
          <p className="font-base text-highlight w-80 flex flex-col items-center">
            {displayDescription}
            {description && description.length > 100 && (
              <button
                className="text-gray-400 hover:text-highlightSecondary duration-200 my-1 capitalize ml-1"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        )}
      </div>
      <div className="md:flex md:justify-center md:items-center">
        <a
          target="_blank"
          href={link}
          className="text-main bg-highlightSecondary p-1 w-32 hover:text-highlightSecondary text-center hover:bg-main duration-200 capitalize"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};
