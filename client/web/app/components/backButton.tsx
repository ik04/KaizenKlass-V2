import { useNavigate } from "@remix-run/react";

export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split("/");
    console.log(pathParts);
    if (pathParts[1] == "login" || "register") {
      navigate(-1);
    } else {
      const newPath = pathParts.slice(0, -1).join("/");
      navigate(newPath);
    }
  };
  return (
    <div
      onClick={goBack}
      className="cursor-pointer flex justify-start items-center"
    >
      <img src="/assets/back.svg" className="md:w-9 w-6" alt="" />
      <p className="font-base text-base md:text-3xl text-highlightSecondary uppercase">
        Back
      </p>
    </div>
  );
};
