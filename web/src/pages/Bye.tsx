import React from "react";
import { useByeQuery } from "../generated/graphql";


export const Bye: React.FC = () => {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <h1 style={{color: "tomato"}} className="wrapper">You are not Authorized to see this Page !!</h1>;
  }

  if (!data) {
    return <div className="wrapper">no data</div>;
  }

  return <h1 style={{color: "green"}} className="wrapper">{data.bye}</h1>;
};
