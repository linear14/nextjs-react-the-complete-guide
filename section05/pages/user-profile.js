function UserPropfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      username: "동현",
    },
  };
}

export default UserPropfilePage;
