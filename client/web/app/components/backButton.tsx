import { useNavigate } from "@remix-run/react";

export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      onClick={goBack}
      className="cursor-pointer flex justify-start items-center"
    >
      <img src="/assets/back.svg" className="md:w-9 w-6" alt="" />
      <p className="font-base md:text-3xl text-highlightSecondary uppercase">
        Back
      </p>
    </div>
  );
};
