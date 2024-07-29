import { useSelector } from "react-redux";
import { selectDialog } from "@/store/slice/dialog.slice";

import AuthUser from "@/components/chat/AuthUser/AuthUser";
import FriendsUser from "@/components/chat/FriendsUser/FriendsUser";
import InfoUser from "@/components/chat/InfoFriends/InfoUser";
import Message from "@/components/chat/Message/Message";
import Input from "@/components/chat/Input/Input";

import { Box } from "@radix-ui/themes";

import styles from "./chat.module.css";

export default function Chat() {
  const dialog = useSelector(selectDialog);

  return (
    <div className={styles.Container}>
      <Box className={styles.BoxChat}>
        <Box className={styles.SectionInfoChat}>
          <AuthUser />
          <FriendsUser />
        </Box>
        {dialog.currentChatUser !== null && (
          <>
            <Box className={styles.SectionChatMessage}>
              {dialog.currentChatUser !== null && (
                <>
                  <InfoUser />
                  <Message />
                  <Input />
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
