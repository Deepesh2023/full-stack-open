const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <>
      <Heading heading={course.name} />
      {course.parts.map((part) => (
        <PartsAndExercises
          key={part.id}
          partName={part.name}
          partExercises={part.exercises}
        />
      ))}
      <p>Total of {totalExercises} exercises</p>
    </>
  );
};

const Heading = ({ heading }) => <h1>{heading}</h1>;

const PartsAndExercises = ({ partName, partExercises }) => {
  return (
    <p>
      {partName} {partExercises}
    </p>
  );
};

export default Course;
