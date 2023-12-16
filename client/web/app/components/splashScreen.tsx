import PacmanLoader from "react-spinners/PacmanLoader";
export const SplashScreen = () => {
  return (
    <div className="h-screen flex w-screen bg-dashboard justify-center items-center z-50">
      <PacmanLoader />
    </div>
  );
};
