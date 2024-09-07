import { useSelector } from "react-redux";
import { selectDialog } from "@/store/slice/dialog.slice";

import User from "@/components/chat/User/User";
import Friends from "@/components/chat/Friends/Friends";
import Message from "@/components/chat/Message/Message";
import MessageHeader from "@/components/chat/Message/MessageHeader";
import MessageInput from "@/components/chat/Message/MessageInput";

import { Box } from "@radix-ui/themes";

import styles from "./chat.module.css";
import { SocketService } from "@/services/socket/socket.service";
import { selectAuth } from "@/store/slice/auth.slice";
import { useEffect } from "react";
import { selectUser } from "@/store/slice/user.slice";
import { useAppDispatch } from "@/store/store";
import { friendsOnlineUpdate } from "@/store/slice/friends.slice";

export type UserActiveDto = {
  userId: string;
  data: string;
};

export default function Chat() {
  const dispatch = useAppDispatch();
  const dialog = useSelector(selectDialog);
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (auth.auth && user.user !== null) {
      const UserInAppInfo: UserActiveDto = {
        userId: user.user?.id,
        data: new Date().toDateString(),
      };

      SocketService.subscribeUsersInOnline((data) => {
        dispatch(friendsOnlineUpdate(data));
      });

      SocketService.userInOnline(UserInAppInfo);
    }
  }, [auth.auth, user.user?.id, dispatch]);

  return (
    <Box className={styles.Container}>
      <Box className={styles.BoxChat}>
        <Box className={styles.SectionInfoChat}>
          <User />
          <Friends />
        </Box>
        {dialog.currentChatUser !== null && (
          <Box className={styles.SectionChatMessage}>
            <MessageHeader />
            <Message />
            <MessageInput />
          </Box>
        )}
      </Box>
    </Box>
  );
}
