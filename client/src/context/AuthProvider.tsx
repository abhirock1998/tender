import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationHook } from "../hooks/useNotification";

type ContextState = {
  hasAuthorized: boolean;
  setHasAuthorized: (email: string, pass: string) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextState>({
  hasAuthorized: false,
  setHasAuthorized: () => {},
  logout: () => {},
});

export const AuthProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const notify = useNotificationHook();

  const [auth, setAuth] = useState(false);

  const handleAuthorized = (email: string, pass: string) => {
    if (email === "admin@gmail.com" && pass === "Pass@123") {
      navigate("/admin");
      setAuth(true);
      AppLocalStore.set("tender_admin_auth", true);
      notify.success("Success !", "Authorized as admin");
    } else {
      console.log("User is not Administrator");
      setAuth(false);
      notify.warning("Warning !", "Invalid Credentials");
      AppLocalStore.set("tender_admin_auth", false);
    }
  };

  const logout = () => {
    setAuth(false);
    AppLocalStore.remove("tender_admin_auth");
    navigate("/");
    notify.info("Info !", "Logged out");
  };

  const value = {
    hasAuthorized: auth,
    setHasAuthorized: handleAuthorized,
    logout,
  };

  useEffect(() => {
    const savedAuth = AppLocalStore.get("tender_admin_auth");
    if (typeof savedAuth === "boolean" && savedAuth === true) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

class AppLocalStore {
  static set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static remove(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }

  static has(key: string) {
    return !!sessionStorage.getItem(key);
  }
}
