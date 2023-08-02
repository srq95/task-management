import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

type MainContextType = {
  userData: UserDataType;
  fetchUserData: (uid: string) => Promise<void>;
  windowWidth: number;
  menuVisbility: boolean;
  setMenuVisbility: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

type ChildrenProps = {
  children: React.ReactNode;
};

const MainProvider: React.FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();

  const [menuVisbility, setMenuVisbility] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
        router.push("/dashboard");
      } else {
        setUserData(null);
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(firestore, "user", uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const contextState: MainContextType = {
    userData,
    fetchUserData,
    windowWidth,
    menuVisbility,
    setMenuVisbility,
  };

  return (
    <MainContext.Provider value={contextState}>{children}</MainContext.Provider>
  );
};

export { MainContext, MainProvider };
