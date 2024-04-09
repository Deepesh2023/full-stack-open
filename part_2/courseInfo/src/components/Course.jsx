const Course = ({ course }) => {
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
