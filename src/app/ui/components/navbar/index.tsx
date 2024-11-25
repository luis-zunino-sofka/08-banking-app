import "./styles.scss";
import { INavItem, IState } from "@core/interfaces";
import { FC } from "react";

export interface IDashboardProps {
  state: IState;
  isRefechingAccounts: boolean;
  navItems: INavItem[];
  refetchAccounts: () => void;
  handleLogout: () => void;
}

export const Navbar: FC<IDashboardProps> = (props) => {
  const {
    state,
    navItems,
    isRefechingAccounts,
    refetchAccounts,
    handleLogout,
  } = props;

  return (
    <nav className="navbar">
      <div className="navbar__title">
        <h1>Bienvenido {state.loginData?.username}</h1>
      </div>
      <div className="navbar__balance">
        <span>Saldo disponible: </span>
        <strong>${state.balance}</strong>
        <button
          disabled={isRefechingAccounts}
          className="navbar__reload"
          onClick={() => refetchAccounts()}
        >
          Actualizar
        </button>
      </div>
      <div className="navbar__nav">
        <ul className="navbar__list">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <button
                className={`navbar__link ${
                  item.isActive ? "navbar__link--active" : ""
                }`}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="navbar__item">
            <button
              className="navbar__link navbar__logout"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
