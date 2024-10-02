function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(UserContext);

  firebase.auth().onAuthStateChanged((userCredential) => {
    if (userCredential) {
      setShow(false);
      currentUser.user = userCredential;
      setEmail(currentUser.user.email);
    } else {
      setShow(true);
      currentUser.user = {};
    }
  });

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  const currentUser = React.useContext(UserContext);

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        var singoutMessage = "Logged Out";
        props.setStatus(singoutMessage);
        setTimeout(() => props.setStatus(""), 4000);
        props.setShow(true);
      })
      .catch((error) => {
        props.setStatus("Couldnt sign out at this time");
        setTimeout(() => props.setStatus(""), 4000);
      });
  }
  return (
    <>
      <h5>Success, logged in </h5>
      <button type="submit" className="btn btn-light" onClick={logout}>
        Logout
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const currentUser = React.useContext(UserContext);

  function handle() {
    console.log(name, email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`User successfuly created: ${email}`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Error ${errorCode}: ${errorMessage}`);
      });
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}
