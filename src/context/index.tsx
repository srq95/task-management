import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

type MainContextType = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserDataType,
  fetchUserData: (uid: string) => Promise<void>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

type ChildrenProps = {
  children: React.ReactNode;
};

const MainProvider: React.FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Listen for changes in authentication state
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
        console.log(userDocSnapshot.data())
      }
    } catch (error) {
      console.error(error);
    }
  };

  const contextState: MainContextType = {
    loggedIn,
    setLoggedIn,
    userData,
    fetchUserData,
  };

  return (
    <MainContext.Provider value={contextState}>{children}</MainContext.Provider>
  );
};

export { MainContext, MainProvider };
