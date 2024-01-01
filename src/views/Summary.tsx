import { Month } from "../lib/Types";

function Summary() {
  return (
    <table className="table mt-4 w-full">
      <thead>
        <tr>
          <th></th>
          {Object.values(Month).map((month) => (
            <th>{month}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
export default Summary;
