import { useSelector } from "react-redux";
import {
  clearCurrentChat,
  clearTypingMessageChat,
  selectDialog,
} from "@/store/slice/dialog.slice";

import { Box, Avatar, Text, Button, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import styles from "./message.module.css";
import { selectFriends } from "@/store/slice/friends.slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";

export default function InfoUser() {
  const dispatch = useAppDispatch();
  const dialog = useSelector(selectDialog);
  const friends = useSelector(selectFriends);

  useEffect(() => {
    const clearTyping = setTimeout(() => {
      if (dialog.chat?.typing.isTyping) {
        dispatch(clearTypingMessageChat());
      }
    }, 5000);

    return () => clearTimeout(clearTyping);
  }, [dialog, dispatch]);

  function closeDialog() {
    dispatch(clearCurrentChat());
  }

  return (
    <Box className={styles.SectionInfoFriends}>
      <Box className={styles.SectionUser}>
        <Avatar
          size="4"
          src={`server/user/avatar/${dialog.currentChatUser?.avatar}`}
          fallback={dialog.currentChatUser?.firstName.charAt(0)}
          radius="full"
        />
        <Box className={styles.YourInfo}>
          <Text size="3" weight="bold">
            {`${dialog.currentChatUser?.firstName} ${dialog.currentChatUser?.lastName}`}
          </Text>
          <Text className={styles.UserStatusActive} size="2">
            {dialog.chat?.typing.isTyping ? (
              `Writing message...`
            ) : friends.friendsOnline?.some(
                (onlineUser) => onlineUser.userId === dialog.currentChatUser?.id
              ) ? (
              <Text as="div" className={styles.UserStatusActive} size="2">
                Online
              </Text>
            ) : (
              <Text as="div" className={styles.UserStatusUnactive} size="2">
                Offline
              </Text>
            )}
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
            <DropdownMenu.Item
              onClick={() => {
                closeDialog();
              }}
              color="gray"
            >
              Close
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    </Box>
  );
}
