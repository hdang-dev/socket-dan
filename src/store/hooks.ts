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

  const setThemeZoom = (zoom: boolean) => {
    dispatch({ type: "CHANGE_THEME", theme: { ...theme, zoom } });
  };

  return { theme, setThemeZoom };
};

export { useUser, useRoom, useTheme };
