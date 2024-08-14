import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, ReactNode, useState } from "react";
import { Start } from "./Start";
import { Feed } from "./components/Feed";

export const Context = createContext<{
  passcode: string;
  setPasscode: (passcode: string) => void;
  debug: boolean;
  currentUTC: number;
}>({
  passcode: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPasscode: (_passcode) => {},
  debug: false,
  currentUTC: Date.now(),
});

function ContextProvider({ children }: { children: ReactNode }) {
  /**
   * If you want to move past the passcode prompt.
   */
  const debug = true;

  /**
   * This UTC is how the posts calculate it's relative recency.
   */
  const currentUTC = 1674629769;

  const [passcode, setPasscode] = useState<string>("");
  return (
    <Context.Provider
      value={{
        passcode,
        setPasscode,
        debug,
        currentUTC,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/feed-study/" element={<Start />} />
          <Route path="/feed-study/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
