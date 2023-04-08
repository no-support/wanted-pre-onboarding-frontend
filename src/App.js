import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const baseUrl = "https://www.pre-onboarding-selection-task.shop";

function App() {
  const [data, setData] = useState();
  const requestData = () => {
    axios
      .get(baseUrl + "/" + "todos", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vLXN1cHBvcnRAdGVzdC5jb20iLCJzdWIiOjcyMzAsImlhdCI6MTY4MDg1NTgxMSwiZXhwIjoxNjgxNDYwNjExfQ.UmnbyNd5dyGigSNdX4fzoZctq_LEoucm__lyLDKlgLM",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    requestData();
  }, []);

  return (
    <div className="App">{<pre>{JSON.stringify(data, null, 2)}</pre>}</div>
  );
}

export default App;
