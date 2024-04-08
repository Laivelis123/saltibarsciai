import React from "react";
import { Link } from "react-router-dom";
import UI from "../components/UI/UI";

function NeraPuslapio() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h1 className="display-4">Puslapis nerastas</h1>
          <p className="lead">Atsiprašome, bet ieškomas puslapis nerastas.</p>
          <p>
            Grįžti į <Link to="/">pagrindinį puslapį</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NeraPuslapio;
