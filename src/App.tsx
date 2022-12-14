import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

type Character = {
  id: number;
  name: string;
  status: string;
};

function App() {
  const [dataFetchStatus, setDataFetchStatus] = useState<string>("NOT_STARTED");
  const [characters, setCharacters] = useState<Character[]>([]);
  console.log(new Date().getTime(), "App");
  console.log(new Date().getTime(), "dataFetchStatus", dataFetchStatus);
  console.log(new Date().getTime(), "characters", characters);

  useEffect(() => {
    (async () => {
      console.log(new Date().getTime(), "useEffect");
      const response = await axios.get("https://rickandmortyapi.com/api/character")
      console.log(new Date().getTime(), "AXIOS done");
      setCharacters(response.data.results);
      setDataFetchStatus("DONE");
      console.log(new Date().getTime(), "setCharacters(response.data.results)", response.data);
      console.log(new Date().getTime(), "setDataFetchStatus(DONE)");
    })();
    console.log(new Date().getTime(), "setDataFetchStatus(IN_PROGRESS)");
    setDataFetchStatus("IN_PROGRESS");
  }, []);

  console.log(new Date().getTime(), "Return JSX");

  let body = <span>No data</span>;
  switch (dataFetchStatus) {
    case "IN_PROGRESS": {
      body = <span>Fetching...</span>
      break;
    }

    case "DONE": {
      body = (
        <ul>
          {characters.map(character => (
            <li
              key={character.id}
              style={{marginLeft: "30px"}}
            >{character.name}</li>
          ))}
        </ul>
      );
      break;
    }
  }
  return (
    <div className={"app"}>
      <div className={"app-data"}>
        {body}
      </div>
    </div>
  );
}

export default App;
