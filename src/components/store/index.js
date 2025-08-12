import { createContext, useContext, useEffect, useState } from "react";
import { getRestaurantProfile } from "../../services/authApi";

export const UserContext = createContext({
  userInfo: null,
  updateUser: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  const updateUser = (newUser) => {
    setUserInfo(newUser);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    (async () => {
      try {
        const profile = await getRestaurantProfile();
        if (profile?.success && profile?.restaurant) {
          setUserInfo(profile.restaurant);
        }
      } catch (error) {
        // ignore and keep userInfo null
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
