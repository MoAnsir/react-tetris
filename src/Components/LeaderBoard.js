import React, { useState } from "react";
import { orderBy } from "lodash";

import "../CSS/LeaderBoard.scss";

const LeaderBoard = ({ userSaveData }) => {
  let sortedData = orderBy(userSaveData, ["score"], ["desc"]);

  return (
    <div className="leader-board">
      <p>LeaderBoard</p>
      <ul>
        {sortedData
          ? sortedData.slice(0, 7).map((user, index) => (
              <li key={user.id}>
                {user.name} - {user.score}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default LeaderBoard;
