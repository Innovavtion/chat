import { useEffect, useRef } from "react";

import {
  DotsVerticalIcon,
  ExitIcon,
  FaceIcon,
  PaperPlaneIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import styles from "./chat.module.css";
import {
  Avatar,
  Box,
  TextField,
  Text,
  ScrollArea,
  DropdownMenu,
  Button,
  Card,
  Flex,
  TextArea,
  Tabs,
} from "@radix-ui/themes";
import UserModal from "@/components/modal/userModal";
import FriendsModal from "@/components/modal/friendsModal";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slice/auth.slice";

const UserFriends: Array = [
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
  { firstName: "Hello", lastName: "Hello", userStatus: "В сети" },
];

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

const ChatEmoji: Array = [
  { emoji: "🤣" },
  { emoji: "😊" },
  { emoji: "❤️" },
  { emoji: "😍" },
  { emoji: "😒" },
  { emoji: "👌" },
  { emoji: "😘" },
  { emoji: "💕" },
  { emoji: "😁" },
  { emoji: "👍" },
  { emoji: "🤣" },
  { emoji: "😊" },
  { emoji: "❤️" },
  { emoji: "😍" },
  { emoji: "😒" },
  { emoji: "👌" },
  { emoji: "😘" },
  { emoji: "💕" },
  { emoji: "😁" },
  { emoji: "👍" },
];

export default function Chat() {
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function logoutUser() {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  }

  return (
    <div className={styles.Container}>
      <Box className={styles.BoxChat}>
        <Box className={styles.SectionInfoChat}>
          <Box
            className={styles.SectionUser}
            style={{ justifyContent: "space-between" }}
          >
            <Box
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size="4"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
                radius="full"
              />
              <Box className={styles.YourInfo}>
                <Text className={styles.Fio} size="3" weight="bold">
                  Имя Фамилия
                </Text>
                <Text className={styles.UserStatus} size="2">
                  В сети
                </Text>
              </Box>
            </Box>
            <Box
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0 15px",
                alignContent: "flex-end",
                marginRight: "10px",
              }}
            >
              <ExitIcon
                width="20"
                height="20"
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => logoutUser()}
              />
              <UserModal />
            </Box>
          </Box>
          <Box className={styles.SectionFriends}>
            <Box
              style={{
                display: "flex",
                width: "calc(100% - 9px)",
                gap: "5px",
              }}
            >
              <FriendsModal />
              <TextField.Root
                className={styles.SearchFriends}
                size="3"
                placeholder="Search Friends"
              >
                <TextField.Slot>
                  <PersonIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <ScrollArea
              className={styles.UserFriends}
              style={{ padding: "0 12px 0 5px", marginTop: "2px" }}
              type="hover"
              scrollbars="vertical"
            >
              <Tabs.Root defaultValue="friends">
                <Tabs.List style={{ justifyContent: "center" }}>
                  <Tabs.Trigger value="friends" style={{ flexGrow: 1 }}>
                    Friends
                  </Tabs.Trigger>
                  <Tabs.Trigger value="invite" style={{ flexGrow: 1 }}>
                    Invite
                  </Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                  <Tabs.Content value="friends">
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      {UserFriends.map((user, index) => (
                        <Box>
                          <Card>
                            <Flex gap="3" align="center">
                              <Avatar
                                size="3"
                                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                radius="full"
                                fallback="T"
                              />
                              <Box>
                                <Text as="div" size="2" weight="bold">
                                  Имя Фамилия
                                </Text>
                                <Text
                                  as="div"
                                  className={styles.UserStatus}
                                  size="2"
                                >
                                  В сети
                                </Text>
                              </Box>
                            </Flex>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="invite">
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      {UserFriends.map((user, index) => (
                        <Box>
                          <Card>
                            <Flex gap="3" align="center" justify="between">
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  size="3"
                                  src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                  radius="full"
                                  fallback="T"
                                />
                                <Box style={{ margin: "0 0 0 12px" }}>
                                  <Text as="div" size="2" weight="bold">
                                    Имя Фамилия
                                  </Text>
                                  <Text
                                    as="div"
                                    className={styles.UserStatus}
                                    size="2"
                                  >
                                    В сети
                                  </Text>
                                </Box>
                              </Box>
                              <Box>
                                <Button size="1">Accepte</Button>
                              </Box>
                            </Flex>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  </Tabs.Content>
                </Box>
              </Tabs.Root>
            </ScrollArea>
          </Box>
        </Box>
        <Box className={styles.SectionChatMessage}>
          <Box className={styles.SectionInfoFriends}>
            <Box className={styles.SectionUser}>
              <Avatar
                size="4"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                fallback="A"
                radius="full"
              />
              <Box className={styles.YourInfo}>
                <Text className={styles.Fio} size="3" weight="bold">
                  Имя Фамилия
                </Text>
                <Text className={styles.UserStatus} size="2">
                  В сети
                </Text>
              </Box>
            </Box>
            <Box className={styles.SectionUser} style={{ width: "50px" }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button
                    className={styles.ButtonInfoChat}
                    color="gray"
                    variant="outline"
                  >
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="center">
                  <DropdownMenu.Item>Edit</DropdownMenu.Item>
                  <DropdownMenu.Item>Archive</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>
          </Box>
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
          <Box className={styles.SectionInputMessage}>
            <TextArea
              placeholder="Write message"
              style={{
                width: "100%",
                minHeight: "25px",
                height: "100%",
                boxShadow: "none",
              }}
              className={styles.TextAreaMessage}
              size="3"
            />
            <Box style={{ display: "flex" }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button
                    style={{ height: "100%", boxShadow: "none" }}
                    className={styles.ButtonMessage}
                    variant="outline"
                    color="gray"
                  >
                    <FaceIcon width="20" height="20" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  className={styles.DropdownMenuEmoji}
                  side="top"
                  align="center"
                >
                  <ScrollArea type="hover" scrollbars="vertical">
                    {ChatEmoji.map((emoji) => (
                      <Button
                        color="gray"
                        style={{ background: "none", cursor: "pointer" }}
                      >
                        {emoji.emoji}
                      </Button>
                    ))}
                  </ScrollArea>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <Button
                style={{ height: "100%", boxShadow: "none" }}
                className={styles.ButtonMessage}
                variant="outline"
                color="gray"
              >
                <PaperPlaneIcon width="20" height="20" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
