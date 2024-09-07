import { Friend } from "@/services/friends.service";
import {
  selectFriends,
  getUnfriends,
  getReceiving,
  createReceiving,
  rejectReceiving,
  searchCurrentNewFriends,
  searchCurrentReceiving,
} from "@/store/slice/friends.slice";
import { useAppDispatch } from "@/store/store";
import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Avatar,
  Box,
  ScrollArea,
  Card,
  Tabs,
} from "@radix-ui/themes";

import styles from "./friends.module.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FriendsModal() {
  const dispatch = useAppDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getUnfriends());
    dispatch(getReceiving());
  }, [dispatch]);

  function getDataModal() {
    dispatch(getUnfriends());
    dispatch(getReceiving());
  }

  function createReceivingInvite(data: Friend) {
    dispatch(createReceiving(data));
  }

  function rejectReceivingInvite(data: Friend) {
    dispatch(rejectReceiving(data));
  }

  function search(text: string) {
    dispatch(searchCurrentNewFriends(text));
    dispatch(searchCurrentReceiving(text));
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          color="gray"
          variant="outline"
          style={{ height: "100%", cursor: "pointer" }}
        >
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Search new friends</Dialog.Title>

        <Flex direction="column" gap="1">
          <TextField.Root
            size="3"
            placeholder="Search New Friends"
            onChange={(e) => search(e.target.value)}
          >
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>
          <ScrollArea
            style={{
              padding: "0 12px 0 0",
              minHeight: "400px",
              maxHeight: "400px",
              height: "100%",
            }}
            type="hover"
            scrollbars="vertical"
          >
            <Tabs.Root defaultValue="new">
              <Tabs.List style={{ justifyContent: "center" }}>
                <Tabs.Trigger value="new" className={styles.FriendsTabsTriger}>
                  New Friends
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="invite"
                  className={styles.FriendsTabsTriger}
                >
                  Invite Friends
                </Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="new">
                  <Box>
                    {friends.newFriends.searchList?.map((user) => (
                      <Box key={user.id}>
                        <Card style={{ marginTop: "5px" }}>
                          <Flex gap="3" align="center" justify="between">
                            <Box style={{ display: "flex" }}>
                              <Avatar
                                size="3"
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName.charAt(0)}
                              />
                              <Box style={{ marginLeft: "10px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
                                </Text>
                                {friends.friendsOnline?.some(
                                  (onlineUser) => onlineUser.userId === user.id
                                ) ? (
                                  <Text
                                    as="div"
                                    className={styles.UserStatusActive}
                                    size="2"
                                  >
                                    Online
                                  </Text>
                                ) : (
                                  <Text
                                    as="div"
                                    className={styles.UserStatusUnactive}
                                    size="2"
                                  >
                                    Offline
                                  </Text>
                                )}
                              </Box>
                            </Box>
                            <Button
                              className={styles.ButtonModal}
                              onClick={() => createReceivingInvite(user)}
                            >
                              Invite
                            </Button>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </Tabs.Content>
                <Tabs.Content value="invite">
                  <Box>
                    {friends.receiving.searchList?.map((user) => (
                      <Box key={user.id}>
                        <Card style={{ marginTop: "5px" }}>
                          <Flex gap="3" align="center" justify="between">
                            <Box style={{ display: "flex" }}>
                              <Avatar
                                size="3"
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName?.charAt(0)}
                              />
                              <Box style={{ marginLeft: "10px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
                                </Text>
                                {friends.friendsOnline?.some(
                                  (onlineUser) => onlineUser.userId === user.id
                                ) ? (
                                  <Text
                                    as="div"
                                    className={styles.UserStatusActive}
                                    size="2"
                                  >
                                    Online
                                  </Text>
                                ) : (
                                  <Text
                                    as="div"
                                    className={styles.UserStatusUnactive}
                                    size="2"
                                  >
                                    Offline
                                  </Text>
                                )}
                              </Box>
                            </Box>
                            <Button
                              color="red"
                              className={styles.ButtonModal}
                              onClick={() => rejectReceivingInvite(user)}
                            >
                              Reject
                            </Button>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </ScrollArea>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className={styles.ButtonModal}>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
