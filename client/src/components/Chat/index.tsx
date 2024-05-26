import React from "react";

// Import Chat component
import MyChat from "./MyChat";

const MemoizedMyChat = React.memo(MyChat);

export default MemoizedMyChat;
