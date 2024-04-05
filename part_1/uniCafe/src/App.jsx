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
      <Heading heading="Give feedback" />
      <Button buttonName="Good" buttonAction={buttonAction("good")} />
      <Button buttonName="Neutral" buttonAction={buttonAction("neutral")} />
      <Button buttonName="Bad" buttonAction={buttonAction("bad")} />
      <Heading heading="Statistics" />
      <StatDisplay statData={statCategories} />
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

const StatDisplay = ({ statData }) => {
  if (statData.total == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <table>
        <StatCategory statsName="Good" stats={statData.good} />
        <StatCategory statsName="Neutral" stats={statData.neutral} />
        <StatCategory statsName="Bad" stats={statData.bad} />
        <StatCategory statsName="All" stats={statData.total} />
        <StatCategory statsName="Average" stats={statData.average} />
        <StatCategory
          statsName="Positive"
          stats={statData.positivePercentage + " %"}
        />
      </table>
    </>
  );
};

const StatCategory = ({ statsName, stats }) => {
  return (
    <>
      <tr>
        <td>{statsName}</td>
        <td>{stats}</td>
      </tr>
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
