import React from "react";

export const EmptyState = () => {
  return (
    <div className="h-[80%] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src="/assets/emptyState.svg" className="w-40" alt="" />
        <p className="text-highlightSecondary font-semibold text-2xl font-base">
          Nothing at the moment
        </p>
      </div>
    </div>
  );
};
