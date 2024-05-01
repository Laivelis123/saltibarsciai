import PropTypes from "prop-types";
const Averages = ({ userAllAverages, userAverage }) => {
  const numRows = Math.ceil(userAllAverages.length / 3);
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    const rowItems = [];

    for (let j = i * 3; j < Math.min(i * 3 + 3, userAllAverages.length); j++) {
      const quiz = userAllAverages[j];
      const categoryName = quiz.Quiz.categoryAlias
        ? quiz.Quiz.categoryAlias.name
        : "Nežinoma";

      rowItems.push(
        <tr key={quiz.quizId}>
          <td
            style={{ width: "40%", borderRadius: "30px" }}
            className="h3 bg-secondary text-white "
          >
            Kategorija: {categoryName}
          </td>
          <td
            style={{ width: "40%", borderRadius: "30px" }}
            className="h3 bg-secondary text-white"
          >
            Vidurkis: {quiz.average}%
          </td>
        </tr>
      );
    }

    rows.push(rowItems);
  }

  return (
    <>
      <div
        style={{
          maxHeight: "40vh",
          overflowY: "auto",
          overflowX: "auto",
          width: "80%",
          margin: "auto",
        }}
      >
        <table className="table table-striped">
          <tbody>{rows}</tbody>
        </table>
      </div>
      {userAllAverages && userAllAverages.length > 0 ? (
        <div className="row mt-3" style={{ width: "40%", margin: "auto" }}>
          <div className="col ">
            <div
              className="card  bg-secondary text-white text-center mb-2"
              style={{ borderRadius: "30px" }}
            >
              <div className="h3 card-body">
                <h5 className="h3 card-title">Bendras vidurkis</h5>
                <p className="card-text">{userAverage.toFixed(3)}%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h3 text-white text-center">Nėra vidurkių</div>
      )}
    </>
  );
};

Averages.propTypes = {
  userAllAverages: PropTypes.arrayOf(
    PropTypes.shape({
      quizId: PropTypes.number.isRequired,
      Quiz: PropTypes.shape({
        categoryAlias: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      }),
      average: PropTypes.number.isRequired,
    })
  ),
  userAverage: PropTypes.number.isRequired,
};

export default Averages;
