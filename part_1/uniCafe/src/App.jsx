import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodButtonAction = () => {
    setGood(good + 1);
  };

  const neutralButtonAction = () => {
    setNeutral(neutral + 1);
  };

  const badButtonAction = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading heading="give feedback" />
      <Button buttonName="Good" buttonAction={goodButtonAction} />
      <Button buttonName="Neutral" buttonAction={neutralButtonAction} />
      <Button buttonName="Bad" buttonAction={badButtonAction} />
      <Heading heading="statistics" />
      <Statistics statsName="Good" stats={good} />
      <Statistics statsName="Neutral" stats={neutral} />
      <Statistics statsName="Bad" stats={bad} />
    </div>
  );
};

const Heading = ({ heading }) => {
  return (
    <>
      <h1>{heading}</h1>
    </>
  );
};

const Statistics = ({ statsName, stats }) => {
  return (
    <>
      <p>
        {statsName} {stats}
      </p>
    </>
  );
};

const Button = ({ buttonName, buttonAction }) => {
  return (
    <>
      <button onClick={buttonAction}>{buttonName}</button>
    </>
  );
};

export default App;
