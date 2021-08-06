import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Footer from "./components/Footer";
import CardWord from "./components/CardWord";
import CardRules from "./components/CardRules";
// ===================================================================  PORT 8000
const URL = "http://localhost:8000";
// ====================================================================  стили MATERIAL UI
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px",
  },
  sentence: {
    textAlign: "center",
    marginTop: "30px",
  },
  result: {
    fontSize: "25px",
    textAlign: "center",
    color: "crimson",
  },
  cards: {
    display: "flex",
  },
}));

// ======================================================================= НАЧАЛО ФУНКЦИИ == == == ==
const MyApp = () => {
  // ==================================================================== стили MATERIAL UI
  const classes = useStyles();
  //==================================================================== states
  const [state, setState] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selText, setSelText] = useState(null);
  const [word, setWord] = useState(null);
  const [resultRu, setResultRu] = useState(null);
  const [newRule, setNewRule] = useState(null);

  //==================================================================== запросыconst fetchWord = async () => {

  const fetchSentensec = async () => {
    let { data } = await axios.get(`${URL}/sentences`);
    setState(data);
  };

  const fetchWord = async () => {
    let { data } = await axios.get(`${URL}/word`);
    setWord(data);
    return data;
  };
  const fetchRule = async () => {
    let { data } = await axios.get(`${URL}/rules`);
    console.log(data);
    setNewRule(data);
  };
  console.log(newRule, "state newRule");
  //==================================================================== useEffects
  useEffect(() => {
    fetchSentensec();
    fetchWord();
    fetchRule();
  }, []);

  useEffect(() => {
    if (word && selText) {
      const data = word.find(
        (item) => item.en.toUpperCase() === selText.toUpperCase()
      );
      setResultRu(data);
    }
  }, [selText]);

  //==================================================================== обработчики
  const handleClickRight = () => {
    if (activeIndex === state.length - 1) return;
    setActiveIndex((prev) => prev + 1);
  };
  const handleClickLeft = () => {
    if (activeIndex <= 0) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleMouseUp = () => {
    let selectedWord = window.getSelection().toString().trim();
    setSelText(selectedWord);
    return selectedWord;
  };
  //   ===================================================================== верстка
  return (
    <>
      <header className={classes.header}>
        <Navbar />
      </header>
      <div className={classes.container}>
        <div
          className={classes.root}
          onMouseUp={handleMouseUp}
          variant="h1"
          component="h2"
        >
          <Button
            className={classes.btnLeft}
            disabled={activeIndex ? null : "disabled"}
            onClick={handleClickLeft}
            variant="contained"
            color="primary"
          >
            <SkipPreviousIcon />
          </Button>
          <Typography
            className={classes.sentence}
            variant="h4"
            component="h2"
            gutterBottom
          >
            {state && state[activeIndex].title}
          </Typography>
          <Button
            onClick={handleClickRight}
            variant="contained"
            color="primary"
          >
            <SkipNextIcon />
          </Button>
        </div>
        <Typography className={classes.result}>
          {resultRu && resultRu.ru}
        </Typography>

        <div className={classes.cards}>
          <CardWord word={word} />
          <CardRules newRule={newRule} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyApp;
