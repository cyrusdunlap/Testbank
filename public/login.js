function Login() {
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
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  const currentUser = React.useContext(UserContext);

  function logout(props) {
    //logout from Firebase
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign out successful");
        props.setShow(true);
        props.setStatus("Signed out successfully!");
        setTimeout(() => props.setStatus(""), 4000);
      })
      .catch((error) => {
        props.setStatus("Unsuccessful Signout: likely server error");
        setTimeout(() => props.setStatus(""), 4000);
      });
  }

  return (
    <>
      <h5>Welcome </h5>
      <button type="submit" className="btn btn-light" onClick={logout}>
        Logout
      </button>
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState("");

  function handle() {
    console.log(user);
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`user: ${user.email}`);
        props.setStatus("");
        props.setShow(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("one");
        console.log(`Error logging in ${errorCode}: ${errorMessage}`);
        props.setStatus("fail!");
      });
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User successfuly logs out");
      })
      .catch((error) => {
        console.log(`Error logging out ${errorCode}: ${errorMessage}`);
      });
  }
  return (
    <>
      Email
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
        Login
      </button>
    </>
  );
}
