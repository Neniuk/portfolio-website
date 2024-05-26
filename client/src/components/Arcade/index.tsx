import React from "react";
import "./styles.css";

import MyArcade from "./MyArcade";

const MemoizedMyArcade = React.memo(MyArcade);

export default MemoizedMyArcade;
