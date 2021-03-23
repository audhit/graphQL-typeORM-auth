import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div style={{margin: "15px"}}>
      <h1 style={{display: "inline-block", padding: "15px"}}>All the Users Below:</h1>
      <ul>
        {data.users.map(x => {
          return (
            <li key={x.id}>
              E-Mail: {x.email}, with userID: {x.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
