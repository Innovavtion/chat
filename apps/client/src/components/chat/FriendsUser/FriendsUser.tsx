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
  DropdownMenu,
} from "@radix-ui/themes";
import {
  CheckIcon,
  Cross2Icon,
  PersonIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";

import styles from "./friendsuser.module.css";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import {
  acceptInvite,
  getFriendsUser,
  getInviteUser,
  selectFriends,
  rejectInvite,
  deleteFriend,
  searchCurrentFriends,
  searchCurrentInvites,
} from "@/store/slice/friends.slice";
import { useSelector } from "react-redux";
import { Friend } from "@/services/friends.service";

export default function FriendsUser() {
  const dispatch = useAppDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getFriendsUser());
    dispatch(getInviteUser());
  }, [dispatch]);

  const acceptInviteInFriendsUser = (user: Friend) => {
    dispatch(acceptInvite(user));
  };

  const rejectInviteInFriendsUser = (user: Friend) => {
    dispatch(rejectInvite(user));
  };

  function deleteFriendIsFriend(user: Friend) {
    dispatch(deleteFriend(user));
  }

  function searchCurrentFriendAndInvites(text: string) {
    dispatch(searchCurrentFriends(text));
    dispatch(searchCurrentInvites(text));
  }

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
          onChange={(e) => searchCurrentFriendAndInvites(e.target.value)}
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
                {friends.friends.searchList !== null && (
                  <>
                    {friends.friends?.searchList?.map((user) => (
                      <Box key={user.id}>
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
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName.charAt(0)}
                              />
                              <Box style={{ margin: "0 0 0 12px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
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
                                  <DropdownMenu.Item>Write</DropdownMenu.Item>
                                  <DropdownMenu.Separator />
                                  <DropdownMenu.Item
                                    color="red"
                                    onClick={() => deleteFriendIsFriend(user)}
                                  >
                                    Delete
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Root>
                            </Box>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </>
                )}
                {friends.friends?.searchList === null && (
                  <>
                    {friends.friends?.friendsList?.map((user) => (
                      <Box key={user.id}>
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
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName.charAt(0)}
                              />
                              <Box style={{ margin: "0 0 0 12px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
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
                                  <DropdownMenu.Item>Write</DropdownMenu.Item>
                                  <DropdownMenu.Separator />
                                  <DropdownMenu.Item
                                    color="red"
                                    onClick={() => deleteFriendIsFriend(user)}
                                  >
                                    Delete
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Root>
                            </Box>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </>
                )}
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
                {friends.invites?.searchList === null && (
                  <>
                    {friends.invites?.invitesList?.map((user) => (
                      <Box key={user.id}>
                        <Card>
                          <Flex gap="3" align="center" justify="between">
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                maxWidth: "180px",
                              }}
                            >
                              <Avatar
                                size="3"
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName.charAt(0)}
                              />
                              <Box style={{ margin: "0 0 0 12px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
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
                              <Button
                                size="1"
                                color="red"
                                mr={"1"}
                                variant="outline"
                                onClick={() => rejectInviteInFriendsUser(user)}
                              >
                                <Cross2Icon />
                              </Button>
                              <Button
                                size="1"
                                variant="outline"
                                onClick={() => acceptInviteInFriendsUser(user)}
                              >
                                <CheckIcon />
                              </Button>
                            </Box>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </>
                )}
                {friends.invites?.searchList !== null && (
                  <>
                    {friends.invites?.searchList?.map((user) => (
                      <Box key={user.id}>
                        <Card>
                          <Flex gap="3" align="center" justify="between">
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                maxWidth: "180px",
                              }}
                            >
                              <Avatar
                                size="3"
                                src={user.avatar}
                                radius="full"
                                fallback={user.firstName.charAt(0)}
                              />
                              <Box style={{ margin: "0 0 0 12px" }}>
                                <Text as="div" size="2" weight="bold">
                                  {user.firstName + " " + user.lastName}
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
                              <Button
                                size="1"
                                color="red"
                                mr={"1"}
                                variant="outline"
                                onClick={() => rejectInviteInFriendsUser(user)}
                              >
                                <Cross2Icon />
                              </Button>
                              <Button
                                size="1"
                                variant="outline"
                                onClick={() => acceptInviteInFriendsUser(user)}
                              >
                                <CheckIcon />
                              </Button>
                            </Box>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </ScrollArea>
    </Box>
  );
}
