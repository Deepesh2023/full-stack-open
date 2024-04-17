import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));

  const selectRandomAnecdote = () => {
    const randomNumber = Math.round(Math.random() * (anecdotes.length - 1));
    setSelected(randomNumber);
  };

  const voteForCurrentAnecdote = () => {
    const votesCopy = [...votes];
    const updatedVoteForCurrentAnecdote = votes[selected] + 1;
    votesCopy[selected] = updatedVoteForCurrentAnecdote;
    setVote([...votesCopy]);
  };

  const largestVote = Math.max(...votes);
  const largestVoteHolder = anecdotes[votes.indexOf(largestVote)];
  const winner = { largestVoteHolder, largestVote };

  return (
    <>
      <Heading heading="Anecdote of the day" />
      <div>
        <AnecdoteAndVotes
          anecdote={anecdotes[selected]}
          votes={votes[selected]}
        />
      </div>
      <button type="button" onClick={voteForCurrentAnecdote}>
        Vote
      </button>
      <button type="button" onClick={selectRandomAnecdote}>
        Next anecdote
      </button>
      <Heading heading="Anecdote with most votes" />
      <AnecdoteAndVotes
        anecdote={winner.largestVoteHolder}
        votes={winner.largestVote}
      />
    </>
  );
};

const Heading = ({ heading }) => {
  return (
    <>
      <h1>{heading}</h1>
    </>
  );
};

const AnecdoteAndVotes = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>Has {votes}</p>
    </>
  );
};

export default App;
