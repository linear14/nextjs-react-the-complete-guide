function UserIdPage(props) {
  const { id } = props;

  return <h1>{id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { uid } = params;

  return {
    props: {
      id: "userid: " + uid,
    },
  };
}

export default UserIdPage;
