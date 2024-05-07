const ErrorMessageDisplay = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <>
        <h2>{errorMessage}</h2>
      </>
    );
  }
  return null;
};

export default ErrorMessageDisplay;
