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
} from "@radix-ui/themes";

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

export default function FriendsModal() {
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

        <Flex direction="column" gap="3">
          <TextField.Root size="3" placeholder="Search New Friends">
            <TextField.Slot>
              <PersonIcon />
            </TextField.Slot>
          </TextField.Root>
          <ScrollArea
            style={{
              padding: "0 12px 0 0",
              maxHeight: "500px",
            }}
            type="hover"
            scrollbars="vertical"
          >
            {UserFriends.map((user, index) => (
              <Box>
                <Card style={{ marginTop: "5px" }}>
                  <Flex gap="3" align="center" justify="between">
                    <Box style={{ display: "flex" }}>
                      <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="full"
                        fallback="T"
                      />
                      <Box style={{ marginLeft: "10px" }}>
                        <Text as="div" size="2" weight="bold">
                          Имя Фамилия
                        </Text>
                        <Text as="div" size="2" color="blue">
                          В сети
                        </Text>
                      </Box>
                    </Box>
                    <Button>Add</Button>
                  </Flex>
                </Card>
              </Box>
            ))}
          </ScrollArea>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
