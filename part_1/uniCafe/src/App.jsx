import { useState } from "react";

const App = () => {
  const [statCategory, setStat] = useState({ good: 0, neutral: 0, bad: 0 });

  const buttonAction = (selectedStat) => {
    const updatedStat = statCategory[selectedStat] + 1;

    const updatedStats = {
      ...statCategory,
      [selectedStat]: updatedStat,
    };

    return () => setStat(updatedStats);
  };

  return (
    <div>
      <Heading heading="give feedback" />
      <Button buttonName="Good" buttonAction={buttonAction("good")} />
      <Button buttonName="Neutral" buttonAction={buttonAction("neutral")} />
      <Button buttonName="Bad" buttonAction={buttonAction("bad")} />
      <Heading heading="statistics" />
      <Statistics statsName="Good" stats={statCategory.good} />
      <Statistics statsName="Neutral" stats={statCategory.neutral} />
      <Statistics statsName="Bad" stats={statCategory.bad} />
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
