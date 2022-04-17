import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DogList from './components/doglist';
import Adoptions from "./components/adoptions";
import Checkout from "./components/checkout";
import { useSelector } from "react-redux";
import { AppState } from "./redux/store";

import { CounterBadge } from "@fluentui/react-badge";

const App: React.FC = () => {
  const dogData = useSelector((state: AppState) => state.DogData.dogList)
  const num = dogData.filter(item => item.isAdopted === true && item.isSubmitted === false).length
  return (
    <Router>
      <>
        <div>
          <ul className="header-nav">
            <li>
              <Link to="/">DOGS</Link>
            </li>
            <li>
              <Link to="/adoptions">ADOPTIONS</Link>
            </li>
            <li>
              <Link to="/checkout">CHECKOUT</Link>

              {num > 0 ? <CounterBadge appearance="filled" color="danger" count={num} /> : ''}
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <DogList />
          </Route>
          <Route path="/adoptions" >
            <Adoptions/>
          </Route>
          <Route path="/checkout" >
            <Checkout/>
          </Route>
        </Switch>
      </>
    </Router>
  )
}

export default App;
