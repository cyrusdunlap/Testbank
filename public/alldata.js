function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    //fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  // let users = ctx.users;

  // function userInfo(users) {
  //   return [users.name, users.email, users.balance];
  // }

  return (
    <>
      <Card
        bgcolor="warning"
        txtcolor="black"
        header="Account Information"
        body={data}
      />
    </>
  );
}
