import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { selectDialog } from "@/store/slice/dialog.slice";

import { Avatar, Box, Text, Card, Flex, ScrollArea } from "@radix-ui/themes";

import styles from "./message.module.css";

export default function Message() {
  const messageEl = useRef<HTMLDivElement>(null);

  const dialog = useSelector(selectDialog);

  useEffect(() => {
    if (messageEl) {
      messageEl.current?.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target?.scroll({ top: target.scrollHeight });
      });
    }
  }, [dialog]);

  return (
    <Box className={styles.SectionMessage}>
      <ScrollArea
        className={styles.UserFriends}
        style={{
          padding: "0 12px 0 0",
          marginTop: "0",
          maxHeight: "680px",
        }}
        type="hover"
        scrollbars="vertical"
        ref={messageEl}
      >
        {dialog.chat?.messages.map((message, index) => (
          <div key={index}>
            {message.userId === dialog.currentChatUser?.id && (
              <Box style={{ display: "flex", margin: "15px 10px" }}>
                <Avatar
                  size="3"
                  src={dialog.currentChatUser?.avatar}
                  radius="full"
                  fallback={dialog.currentChatUser?.firstName.charAt(0)}
                  style={{ display: "flex", alignSelf: "flex-end" }}
                />
                <Card style={{ margin: "0 10px" }}>
                  <Flex gap="3" align="center">
                    <Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Text as="div" size="2" weight="bold">
                          {`${dialog.currentChatUser?.firstName} ${dialog.currentChatUser?.lastName}`}
                        </Text>
                        <Text
                          as="div"
                          style={{ marginLeft: "5px" }}
                          className={styles.UserStatus}
                          size="1"
                          color="gray"
                        >
                          {message.dataWrite}
                        </Text>
                      </Box>
                      <Text
                        as="div"
                        size="2"
                        style={{ marginTop: "3px", maxWidth: "350px" }}
                      >
                        {message.text}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            )}
            {message.userId !== dialog.currentChatUser?.id && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  margin: "15px 10px",
                  justifyContent: "flex-start",
                  borderBottomRightRadius: 0,
                }}
              >
                <Card style={{ margin: "0 10px" }}>
                  <Flex gap="3" align="center">
                    <Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          as="div"
                          className={styles.UserStatus}
                          size="1"
                          color="gray"
                        >
                          {message.dataWrite}
                        </Text>
                      </Box>
                      <Text
                        as="div"
                        size="2"
                        style={{
                          marginTop: "3px",
                          maxWidth: "350px",
                        }}
                      >
                        {message.text}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            )}
          </div>
        ))}
      </ScrollArea>
    </Box>
  );
}
