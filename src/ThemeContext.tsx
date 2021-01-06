import { createContext, Dispatch, SetStateAction } from "react";

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "green",
  (theme) => theme,
]);

export default ThemeContext;
