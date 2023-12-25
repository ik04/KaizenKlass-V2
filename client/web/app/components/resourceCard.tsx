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
    <div className="bg-mainLighter flex flex-col justify-between items-center p-10 rounded-2xl w-80 h-96 overflow-hidden">
      <div className="h-1/2 flex items-center justify-center">
        <img src={`${icon}`} className="w-32" alt="" />
      </div>
      <div className="text-center flex flex-col">
        <h1 className="font-base text-highlightSecondary text-2xl font-bold">
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
      <div className="flex justify-center items-center">
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
