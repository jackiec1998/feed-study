import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, ReactNode, useState } from "react";
import { Start } from "./Start";
import { Feed } from "./components/Feed";

export const Context = createContext<{
  passcode: string;
  setPasscode: (passcode: string) => void;
  debug: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}>({ passcode: "", setPasscode: (_passcode) => {}, debug: false });

function ContextProvider({ children }: { children: ReactNode }) {
  const debug = true;

  const [passcode, setPasscode] = useState<string>("");
  return (
    <Context.Provider
      value={{
        passcode,
        setPasscode,
        debug,
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
