import PropTypes from "prop-types";

const GroupAverages = ({ userGroups }) => {
  const calculateGroupAverage = (users) => {
    const totalAverage = users.reduce((sum, user) => {
      return sum + (user.averageGrade || 0);
    }, 0);
    return totalAverage ? totalAverage / users.length : 0;
  };

  const rows = [];

  userGroups.forEach((group) => {
    rows.push(
      <tr key={group.id}>
        <td style={{ borderRadius: "30px" }} className="h3 bg-dark text-white ">
          Grupė: {group.name}
        </td>
        <td style={{ borderRadius: "30px" }} className="h3 bg-dark text-white">
          Vidurkis: {calculateGroupAverage(group.users).toFixed(3)}%
        </td>
      </tr>
    );
    if (group.groupCategoryAverages.length > 0) {
      rows.push(
        <tr key={`${group.id}_categories`}>
          <td
            colSpan="2"
            style={{ borderRadius: "30px" }}
            className="h3 px-4 bg-secondary text-white "
          >
            Kategorijos:
          </td>
        </tr>
      );
      group.groupCategoryAverages.forEach((category) => {
        rows.push(
          <tr key={`${group.id}_${category.categoryId}`}>
            <td
              style={{ borderRadius: "30px" }}
              className="h3 px-5 bg-black text-white "
            >
              {category.categoryName}
            </td>
            <td
              style={{ borderRadius: "30px" }}
              className="h3 px-5 bg-black text-white"
            >
              Vidurkis: {category.averageGrade.toFixed(3)}%
            </td>
          </tr>
        );
      });
    }
  });

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
    </>
  );
};

GroupAverages.propTypes = {
  userGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          username: PropTypes.string.isRequired,
          averageGrade: PropTypes.number,
        })
      ),
      groupCategoryAverages: PropTypes.arrayOf(
        PropTypes.shape({
          categoryId: PropTypes.number.isRequired,
          categoryName: PropTypes.string.isRequired,
          averageGrade: PropTypes.number.isRequired,
        })
      ),
    })
  ),
};

export default GroupAverages;
