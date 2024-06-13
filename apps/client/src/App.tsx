import { useEffect, useState } from "react";

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetch("server/user")
      .then((res) => res.text())
      .then(setGreeting);
  }, []);

  return (
    <>
      <p>Test data</p>
      <p>{greeting}</p>
    </>
  );
}

export default App;
