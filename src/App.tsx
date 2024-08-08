import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Start } from "./Start";

function Header() {
  return (
    <div className="flex-row p-2">
      <span>{new Date().toLocaleString()}</span>
    </div>
  );
}

export const Context = createContext<{
  passcode: string;
  setPasscode: (passcode: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}>({ passcode: "", setPasscode: (passcode) => {} });

function ContextProvider({ children }: { children: ReactNode }) {
  const [passcode, setPasscode] = useState<string>("");
  return (
    <Context.Provider
      value={{
        passcode,
        setPasscode,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function Feed() {
  const { passcode } = useContext(Context);
  const navigate = useNavigate();

  // Check if the user provided a passcode.
  useEffect(() => {
    if (passcode === "") {
      navigate("/feed-study/");
    }
  });

  return (
    <>
      <Header />
    </>
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
