import FriendsModal from "@/components/modal/friends/friendsModal";

import {
  Avatar,
  Box,
  Text,
  Button,
  Card,
  Flex,
  ScrollArea,
  Tabs,
  TextField,
} from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";

import styles from "./friendsuser.module.css";

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

export default function FriendsUser() {
  return (
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
                          <Text as="div" className={styles.UserStatus} size="2">
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
  );
}
