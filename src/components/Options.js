function Options({ question, dispatch, answer }) {
  const hasAnswerd = answer != null;
  return (
    <div className="options">
      {question.options.map((item, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswerd
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={item}
            disabled={hasAnswerd}
            onClick={() => dispatch({ type: "newAnswer", pyload: index })}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
