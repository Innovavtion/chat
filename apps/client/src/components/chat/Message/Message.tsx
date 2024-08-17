import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { selectDialog } from "@/store/slice/dialog.slice";

import { Box, Card, Avatar, Text, ScrollArea } from "@radix-ui/themes";

import styles from "./message.module.css";

export default function Message() {
  const messageEl = useRef<HTMLDivElement>(null);
  const dialog = useSelector(selectDialog);

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollTop = messageEl.current.scrollHeight;
    }
  }, [dialog]);

  return (
    <Box className={styles.Container}>
      <ScrollArea
        className={styles.ContentScroll}
        type="hover"
        scrollbars="vertical"
        ref={messageEl}
      >
        {dialog.chat?.messages.map((message, index) => (
          <Box key={index}>
            {message.userId === dialog.currentChatUser?.id && (
              <Box className={styles.ContainerFriendMessage}>
                <Avatar
                  className={styles.FriendAvatar}
                  size="3"
                  radius="full"
                  src={`server/user/avatar/${dialog.currentChatUser?.avatar}`}
                  fallback={dialog.currentChatUser?.firstName.charAt(0)}
                />
                <Card className={styles.TextBox}>
                  <Box className={styles.MessageTitle}>
                    <Text size="2" weight="bold">
                      {`${dialog.currentChatUser?.firstName} ${dialog.currentChatUser?.lastName}`}
                    </Text>
                    <Text
                      className={styles.FriendDataWrite}
                      size="1"
                      color="gray"
                    >
                      {message.dataWrite}
                    </Text>
                  </Box>
                  <Text className={styles.Message} size="2">
                    {message.text}
                  </Text>
                </Card>
              </Box>
            )}
            {message.userId !== dialog.currentChatUser?.id && (
              <Box className={styles.ContainerYourMessage}>
                <Card className={styles.TextBox}>
                  <Box className={styles.MessageTitle}>
                    <Text size="1" color="gray">
                      {message.dataWrite}
                    </Text>
                  </Box>
                  <Text className={styles.Message} size="2">
                    {message.text}
                  </Text>
                </Card>
              </Box>
            )}
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
}
