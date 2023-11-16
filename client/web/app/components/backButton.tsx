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
      <img src="/assets/back.svg" className="w-9" alt="" />
      <p className="font-base text-3xl text-highlightSecondary uppercase">
        Back
      </p>
    </div>
  );
};
