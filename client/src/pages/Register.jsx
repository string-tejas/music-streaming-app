import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      Register
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
  );
};

export default Register;
