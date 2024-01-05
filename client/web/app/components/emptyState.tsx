import React from "react";

export const EmptyState = () => {
  return (
    <div className="h-[80%] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src="/assets/emptyState.svg" className="md:w-36 w-24" alt="" />
        <p className="text-highlightSecondary font-semibold md:text-2xl text-base font-base">
          Nothing at the moment
        </p>
      </div>
    </div>
  );
};
