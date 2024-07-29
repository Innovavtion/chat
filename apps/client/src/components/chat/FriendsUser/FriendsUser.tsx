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
import {
  addMessageChat,
  getChatUser,
  getCurrentChatsUser,
  getCurrentChatUser,
  selectDialog,
} from "@/store/slice/dialog.slice";
import { SocketService } from "@/services/socket/socket.service";
import { selectUser } from "@/store/slice/user.slice";

export default function FriendsUser() {
  const dispatch = useAppDispatch();
  const userAuth = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const dialog = useSelector(selectDialog);

  useEffect(() => {
    dispatch(getFriendsUser());
    dispatch(getInviteUser());
    dispatch(getCurrentChatsUser());
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

  function getCurrentUserDialog(user: Friend) {
    if (user.id !== dialog.currentChatUser?.id) {
      dispatch(getCurrentChatUser(user));

      dialog.chats?.map((e) => {
        if (e.particapants[0].userId === user.id) {
          dispatch(getChatUser(e)).then(() => {
            if (dialog.chat !== null) {
              SocketService.leaveChat(dialog.chat?.id);
              SocketService.disconnect();

              SocketService.connect();
              SocketService.joinChat(e.id);
              SocketService.subscribeCreateMessage((data) => {
                if (userAuth.user?.id !== data.userId) {
                  dispatch(addMessageChat(data));
                }
              });
            } else {
              SocketService.connect();
              SocketService.joinChat(e.id);
              SocketService.subscribeCreateMessage((data) => {
                if (userAuth.user?.id !== data.userId) {
                  dispatch(addMessageChat(data));
                }
              });
            }
          });
        }
      });
    }
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
                      <Box
                        key={user.id}
                        onClick={() => getCurrentUserDialog(user)}
                      >
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
                                <Text
                                  as="div"
                                  size="2"
                                  weight="bold"
                                  color={
                                    user.id === dialog.currentChatUser?.id &&
                                    "blue"
                                  }
                                >
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
