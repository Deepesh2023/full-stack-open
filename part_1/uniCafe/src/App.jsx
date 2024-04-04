import { useState } from "react";

const App = () => {
  const [statCategory, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positivePercentage: 0,
  });

  const buttonAction = (selectedStat) => {
    const updatedSelectedStat = statCategory[selectedStat] + 1;
    const updatedTotal = statCategory.total + 1;

    const updatedStats = {
      ...statCategory,
      [selectedStat]: updatedSelectedStat,
      total: updatedTotal,
    };

    const updatedAverage =
      (updatedStats.good + -updatedStats.bad) / updatedStats.total;

    const updatedPositivePercentage =
      (updatedStats.good / updatedStats.total) * 100;

    updatedStats.average = updatedAverage;
    updatedStats.positivePercentage = updatedPositivePercentage;

    return () => {
      setStats(updatedStats);
    };
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
      <Statistics statsName="All" stats={statCategory.total} />
      <Statistics statsName="Average" stats={statCategory.average} />
      <Statistics
        statsName="Positive"
        stats={statCategory.positivePercentage + " %"}
      />
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
