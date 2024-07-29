import { Box, Avatar, Text, Button, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import styles from "./infouser.module.css";
import { useSelector } from "react-redux";
import { selectDialog } from "@/store/slice/dialog.slice";
import { useAppDispatch } from "@/store/store";

export default function InfoUser() {
  const dispatch = useAppDispatch();
  const dialog = useSelector(selectDialog);

  return (
    <Box className={styles.SectionInfoFriends}>
      <Box className={styles.SectionUser}>
        <Avatar
          size="4"
          src={dialog.currentChatUser?.avatar}
          fallback={dialog.currentChatUser?.firstName.charAt(0)}
          radius="full"
        />
        <Box className={styles.YourInfo}>
          <Text className={styles.Fio} size="3" weight="bold">
            {dialog.currentChatUser?.firstName +
              " " +
              dialog.currentChatUser?.lastName}
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
            <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    </Box>
  );
}
