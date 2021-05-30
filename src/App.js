import Header from "./components/Header";
import React, {Fragment} from "react"
import CreditSimulator from "./components/CreditSimulator/CreditSimulator";

function App() {
  return (
    <Fragment>
       <Header />
       <CreditSimulator />
    </Fragment>
  );
}

export default App;
