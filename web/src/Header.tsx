import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";
import "./styles/header.css";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div style={{color: "greenyellow"}}>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div style={{color: "tomato"}}>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/me">me</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client!.resetStore();
            }}
          >
            logout
          </button>
        ) : <div>
        <Link to="/login">login</Link>
      </div>}
      </div>
      {body}
    </header>
  );
};
