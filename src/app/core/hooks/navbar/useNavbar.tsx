import { ROUTE_PATH } from "@core/constants";
import { INavItem } from "@core/interfaces";
import { useAppContext } from "@core/state";
import { resetLoginData } from "@core/state/login";
import { useNavigate } from "react-router-dom";

export const useNavbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const isActive = (path: string) => path === location.pathname;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetLoginData(undefined));
    navigate(ROUTE_PATH.LOGIN);
  };

  const navItems: INavItem[] = [
    {
      path: ROUTE_PATH.DASHBOARD,
      label: "Depósito",
      onClick: () => navigate(ROUTE_PATH.DASHBOARD),
      isActive: isActive(ROUTE_PATH.DASHBOARD),
    },
    {
      path: ROUTE_PATH.PURCHASE,
      label: "Comprar",
      onClick: () => navigate(ROUTE_PATH.PURCHASE),
      isActive: isActive(ROUTE_PATH.PURCHASE),
    },
    {
      path: ROUTE_PATH.ACOUNT,
      label: "Gestion de cuentas",
      onClick: () => navigate(ROUTE_PATH.ACOUNT),
      isActive: isActive(ROUTE_PATH.ACOUNT),
    },
    {
      path: ROUTE_PATH.WITHDRAW,
      label: "Retirar",
      onClick: () => navigate(ROUTE_PATH.WITHDRAW),
      isActive: isActive(ROUTE_PATH.WITHDRAW),
    },
  ];

  return { navItems, handleLogout };
};

export default useNavbar;
