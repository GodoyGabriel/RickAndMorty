import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterActions, addToFavoritesAction } from "../../redux/charactersDuck";

const Home = ({ characters, removeCharacterActions, addToFavoritesAction }) => {
  function renderCharacter() {
    let character = characters[0];
    return <Card leftClick={nextCharacter} rightClick={addFav} {...character} />;
  }

  const nextCharacter = () => {
    removeCharacterActions();
  };

  const addFav = () => {
    addToFavoritesAction();
  }

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

export default connect(mapStateToProps, { removeCharacterActions, addToFavoritesAction })(Home);
