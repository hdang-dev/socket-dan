import { useContext } from "react";
import { StoreContext } from "./provider";

const useUser = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { user } = state;

  return { user };
};

const useRoom = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { room } = state;

  return { room };
};

const useTheme = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { theme } = state;

  const setThemeActive = (active: boolean) => {
    dispatch({ type: "CHANGE_THEME", theme: { ...theme, active } });
  };

  const setBackground = (background: string) => {
    dispatch({ type: "CHANGE_THEME", theme: { ...theme, background } });
  };

  const setPlanet = (planet: string, animation: string) => {
    dispatch({ type: "CHANGE_THEME", theme: { ...theme, planet, animation } });
  };

  return { theme, setThemeActive, setBackground, setPlanet };
};

export { useUser, useRoom, useTheme };
