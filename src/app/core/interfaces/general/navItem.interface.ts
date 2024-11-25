export interface INavItem {
  path: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}
