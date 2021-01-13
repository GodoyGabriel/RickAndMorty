import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterActions } from "../../redux/charactersDuck";

const Home = ({ characters, removeCharacterActions }) => {
  function renderCharacter() {
    let character = characters[0];
    return <Card leftClick={nextCharacter} {...character} />;
  }

  const nextCharacter = () => {
    removeCharacterActions();
  };

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    characters: state.characters.array,
  };
}

export default connect(mapStateToProps, { removeCharacterActions })(Home);
