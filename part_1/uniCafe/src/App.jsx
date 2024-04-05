import { useState } from "react";

const App = () => {
  const [statCategories, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positivePercentage: 0,
  });

  const buttonAction = (selectedStat) => {
    const updatedSelectedStat = statCategories[selectedStat] + 1;
    const updatedTotal = statCategories.total + 1;

    const updatedStats = {
      ...statCategories,
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
      <StatDisplay statCategory={statCategories} />
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

const StatDisplay = ({ statCategory: statCategories }) => {
  return (
    <>
      <StatCategory statsName="Good" stats={statCategories.good} />
      <StatCategory statsName="Neutral" stats={statCategories.neutral} />
      <StatCategory statsName="Bad" stats={statCategories.bad} />
      <StatCategory statsName="All" stats={statCategories.total} />
      <StatCategory statsName="Average" stats={statCategories.average} />
      <StatCategory
        statsName="Positive"
        stats={statCategories.positivePercentage + " %"}
      />
    </>
  );
};

const StatCategory = ({ statsName, stats }) => {
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
