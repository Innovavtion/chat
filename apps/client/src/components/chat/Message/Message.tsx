import { useEffect, useRef } from "react";
import { Avatar, Box, Text, Card, Flex, ScrollArea } from "@radix-ui/themes";

import styles from "./message.module.css";

const ChatMessages: Array = [
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf", dataWrite: "16.06.2024 20:38" },
  { message: "sdfgdfgdfgdfgdfgdf🤣", dataWrite: "16.06.2024 20:38" },
  {
    message:
      "sdfgdfgdfgdfgdfgdfasdfasdfasdfasdfasdfasdfdfasdfasdfasdfasdfasdfasedfdfgasdgasdgasdgadsgdfsgsdfgsdfggfjk;hdfgjkjadfgkjkadfgjkfgajklagdfhjkl",
    dataWrite: "16.06.2024 20:38",
  },
  { message: "Хеллоу", dataWrite: "16.06.2024 20:38" },
];

export default function Message() {
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
  }, []);

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
        {ChatMessages.map((message, index) => (
          <>
            <Box style={{ display: "flex", margin: "15px 10px" }}>
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                radius="full"
                fallback="T"
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
                        Имя Фамилия
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
                      {message.message}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                margin: "15px 10px",
                justifyContent: "flex-start",
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
                      style={{ marginTop: "3px", maxWidth: "350px" }}
                    >
                      {message.message}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </>
        ))}
      </ScrollArea>
    </Box>
  );
}
