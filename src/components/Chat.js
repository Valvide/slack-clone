import React from "react";
import styled from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { setMessages, selectMessages } from "../features/appSlice";
import { useDispatch } from "react-redux";
import Message from "./Message";
function Chat() {
  const chatRef = React.useRef(null);

  const roomId = useSelector(selectRoomId);
  const roomMessages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  //const [rowMessages] = useCollection(roomId && collection(db,'rooms',roomId,'messages'))
  //uplift this query

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          // messages.push(doc.data());
          messages.push({
            message: doc.data().message,
            user: doc.data().user,
            userImage: doc.data().userImage,
            timestamp: new Date(
              doc.data().timestamp?.seconds * 1000
            ).toUTCString(),
          });
        });
        console.log("Current messages: ", messages);
        dispatch(setMessages(messages));
        chatRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    );
    //chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    return unsubscribe;
  }, [roomId]);

  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoIcon /> Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessages>
          {/** Listout messages */}

          {roomMessages?.map((doc, index) => {
            const { message, timestamp, user, userImage } = doc;
            // return <div key={index}>{message}</div>;

            return (
              <Message
                key={index}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>

        <ChatInput channelName={roomDetails?.data().name} channelId={roomId} />
      </>
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div``;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 60px;
`;
