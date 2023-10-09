import { useNavigate } from "react-router-dom";

export const goToRoute = (
  routeName: string,
  router: ReturnType<typeof useNavigate>
): ((e: React.MouseEvent<HTMLElement>) => void) => {
  return (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    router(routeName);
  };
};
