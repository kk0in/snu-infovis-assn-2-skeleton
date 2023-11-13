import React from "react";
import MainPlot from "./components/MainPlot";

import movies from "./data/movie.json";

import "./App.css";


function App() {

  const name = "Yeongin Kim";
  const studentNum = "2023-23910";

  const nominal = ["genre", "creative_type", "source"];
  const ordinal = ["release", "rating"];
  const quantitative = ["budget", "us_gross", "worldwide_gross", "rotten_rating", "imdb_rating", "imdb_votes"];
  
  const width = 500;
  const height = 350;
  const margin = 35;
  const pointSize = 3;
  const maxPointSize = 10;

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <h1 style={{marginRight: 10}}>
        {"Assignment #2 /"}
        </h1>
        <h2 style={{marginTop: 25}}>
          {name + " (" + studentNum + ")"}
        </h2>
      </div>
      <div class="splotContainer">
        <MainPlot
          attributes={{ nominal, ordinal, quantitative }} 
          width={width}
          height={height}
          data={movies}
          margin={margin}
          pointSize={pointSize}
          maxPointSize={maxPointSize}
        />
      </div>
    </div>
  );
}

export default App;
