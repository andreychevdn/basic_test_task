export const UserInfo = ({ match }) => {
  const login = match.params.id;
  return <h1>User info : {login}</h1>;
};
