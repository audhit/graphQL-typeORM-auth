import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";

interface Props {
  graphQL_Error_MSG: string;
}

export const App: React.FC<Props> = ({graphQL_Error_MSG}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if(graphQL_Error_MSG) {
    return <h1>{graphQL_Error_MSG}</h1>;
  }

  return <Routes />;
};
