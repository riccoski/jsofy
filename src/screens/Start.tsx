//  @flow
import React, { useContext, useState, useEffect } from "react";
import { js_beautify as beautify } from "js-beautify";
import { upperFirst } from "lodash";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { UnControlled as CodeMirror } from "react-codemirror2";
import uuid from "uuid/v4";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Store } from "../App";
import { History } from "history";

interface Props {
  history: History;
}

const INITIAL_STATE = beautify(
  '[{"caption": "Chelsea FC Preseason Tour 2015 Graphic","type": "image","src": "pre-season2.jpg"}]'
);

function Start({ history }: Props) {
  const { dispatch } = useContext(Store);
  const [body, setBody] = useState(INITIAL_STATE);
  const [error, setError] = useState();

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, []);

  function handleChange(_: any, __: any, code: string) {
    setBody(code.replace(/\\/g, ""));
  }

  const options = {
    mode: "javascript",
    lineNumbers: false
  };

  function handleSubmit() {
    const items = JSON.parse(body);
    try {
      const codeParsed = items[0];

      const fields = Object.keys(codeParsed).map(k => ({
        id: uuid(),
        label: upperFirst(k),
        name: k,
        type: typeof codeParsed[k] == "string" ? "string" : "Dropdown",
        isTitle: k == "name" || k == "caption"
      }));

      dispatch({
        type: "START",
        items,
        fields
      });
      history.push("/fields");
    } catch (error) {
      setError("Invalid JSON format");
    }
  }

  return (
    <div style={{ position: "relative", width: "700px", margin: "4em auto" }}>
      <h2>Paste in JSON code</h2>
      <Paper
        elevation={8}
        style={{ marginBottom: "1.5em", padding: "1em", textAlign: "left" }}
      >
        <CodeMirror value={body} onChange={handleChange} options={options} />
      </Paper>
      <Button color="secondary" onClick={handleSubmit} variant="raised">
        Process
      </Button>
    </div>
  );
}

export default Start;
