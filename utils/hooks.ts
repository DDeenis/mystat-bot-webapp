import { UserInfo } from "mystat-api";
import React from "react";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const loadingRef = React.useRef(false);

  React.useEffect(() => {
    // fetch user info only once
    if (loadingRef.current) return;
    loadingRef.current = true;
    fetch("/api/user")
      .then((r) => {
        if (!r.ok) throw r;
        return r.json();
      })
      .then((r) => {
        setUserInfo(r);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return { userInfo };
};
