function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question<strong>{index + 1}</strong> /{numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;

// value={index + Number(answer !== null)}
// ვიცით რომ answer-ი boolean ის ტიპის, ამიტომაც მისი კონვერტაცია
// Number ში true -ს შემთხვევაში არის 1,false ის შემთხვევში 0
// value={index + Number(answer !== null)}  ეს ცანაწერი კი მთლიანად
// ნიშნავს რომ როგორც კი პასუხს დავაკლიკებთ progress ის ინდიკატორი
// წაიწევს წინ ერთი ნაბიჯით
