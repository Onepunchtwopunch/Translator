import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 100,
    margin: "0 auto",
    marginTop: 50,
    marginBottom: 50,
    border: "1px black solid",
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardWord({ word }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Новое слово
        </Typography>
        <Typography variant="h4" component="h2">
          {word && word[1].en}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          перевод
        </Typography>
        <Typography variant="body4" component="p">
          {word && word[1].ru}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Узнать больше
        </Button>
      </CardActions>
    </Card>
  );
}
