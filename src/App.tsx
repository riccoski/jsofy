import React, { createContext, useReducer } from "react";
import { js_beautify as beautify } from "js-beautify";
import { blueGrey, red, purple } from "@material-ui/core/colors";
import { Route, Switch, withRouter } from "react-router-dom";
import Fields from "./screens/Fields";
import Start from "./screens/Start";
const typeOptions = [
  { label: "Dropdown", value: "dropdown" },
  { label: "True or False", value: "boolean" },
  { label: "Text Field", value: "string" }
];

const initialState = {
  asJSON: "",
  items: [],
  fields: []
};

export interface iField {
  id: string;
  label: string;
  name: string;
  type: string;
  isTitle: boolean;
}

export const Store = createContext({
  ...initialState,
  typeOptions,
  dispatch: (data: Object) => true
});

const appBackground = blueGrey[900]; // #F44336

function reducer(state: any, action: any) {
  switch (action.type) {
    case "START":
      return { ...state, ...action.payload };
    case "SET_CODE":
      return { ...state, code: beautify(action.value) };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function App({ history }: { history?: any }) {
  const [store, dispatch]: [any, any] = useReducer(reducer, initialState);

  function handleClick() {
    history.push("/");
  }

  return (
    <Store.Provider
      value={{
        ...store,
        dispatch,
        typeOptions,
        asJSON: beautify(JSON.stringify(store.items))
      }}
    >
      <div
        className="App"
        style={{
          backgroundColor: appBackground,
          color: "white",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <h1
          onClick={handleClick}
          style={{ cursor: "pointer", textAlign: "center" }}
        >{`{ JSOFY }`}</h1>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/fields" component={Fields} />
          {/*
        <Route path="/content" component={Content} /> */}
        </Switch>
        <footer style={{ opacity: 0.3, textAlign: "center" }}>
          <small>&copy; 2017 Ricco Sobers</small>
        </footer>
      </div>
    </Store.Provider>
  );
}

export default withRouter(App);
