import { Box, Avatar, Text, Button, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import styles from "./infouser.module.css";

export default function InfoUser() {
  return (
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
  );
}
