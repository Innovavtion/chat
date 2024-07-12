import AuthUser from "@/components/chat/AuthUser/AuthUser";
import FriendsUser from "@/components/chat/FriendsUser/FriendsUser";
import InfoUser from "@/components/chat/InfoFriends/InfoUser";
import Message from "@/components/chat/Message/Message";
import Input from "@/components/chat/Input/Input";

import { Box } from "@radix-ui/themes";

import styles from "./chat.module.css";

export default function Chat() {
  return (
    <div className={styles.Container}>
      <Box className={styles.BoxChat}>
        <Box className={styles.SectionInfoChat}>
          <AuthUser />
          <FriendsUser />
        </Box>
        <Box className={styles.SectionChatMessage}>
          <InfoUser />
          <Message />
          <Input />
        </Box>
      </Box>
    </div>
  );
}
