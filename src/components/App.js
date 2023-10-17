import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,

  // 'loading', 'error','ready','active','finished'
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.pyload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.pyload,
        points:
          action.pyload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        secondsRemaining: null,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining--,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", pyload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="main">
        <Main>
          {state.status === "loading" && <Loader />}
          {state.status === "error" && <Error />}
          {state.status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {state.status === "active" && (
            <>
              <Progress
                index={state.index}
                numQuestions={numQuestions}
                points={state.points}
                maxPossiblePoints={maxPossiblePoints}
                answer={state.answer}
              />
              <Question
                question={state.questions[state.index]}
                dispatch={dispatch}
                answer={state.answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={state.secondsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={state.answer}
                  index={state.index}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {state.status === "finished" && (
            <FinishScreen
              points={state.points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={state.highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </main>
    </div>
  );
}
