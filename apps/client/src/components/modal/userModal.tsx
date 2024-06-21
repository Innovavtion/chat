import { GearIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Avatar,
  Flex,
  Box,
  Text,
  TextField,
  Tabs,
} from "@radix-ui/themes";

export default function UserModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <GearIcon
          width="20"
          height="20"
          color="gray"
          cursor="hover"
          style={{ cursor: "pointer" }}
        />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Account Settings</Dialog.Title>

        <Tabs.Root defaultValue="account">
          <Tabs.List style={{ justifyContent: "center" }}>
            <Tabs.Trigger value="account" style={{ flexGrow: 1 }}>
              Account
            </Tabs.Trigger>
            <Tabs.Trigger value="email" style={{ flexGrow: 1 }}>
              Email
            </Tabs.Trigger>
            <Tabs.Trigger value="password" style={{ flexGrow: 1 }}>
              Password
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="5">
            <Tabs.Content value="account">
              <Flex direction="row" gap="3">
                <Avatar
                  size="8"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  radius="full"
                  fallback="T"
                />
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      First Name
                    </Text>
                    <TextField.Root
                      defaultValue="Имя"
                      placeholder="Enter your full name"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Last Name
                    </Text>
                    <TextField.Root
                      defaultValue="Фамилия"
                      placeholder="Enter your email"
                    />
                  </label>
                </Box>
              </Flex>
              <Flex justify="end" gap="3" mt="5">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="email">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Current Email
                  </Text>
                  <TextField.Root
                    defaultValue="current@gmail.com"
                    placeholder="email"
                    type="email"
                    disabled
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    New Email
                  </Text>
                  <TextField.Root
                    defaultValue=""
                    placeholder="New email"
                    type="email"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Current Password
                  </Text>
                  <TextField.Root
                    defaultValue=""
                    placeholder="Enter current password"
                    type="password"
                  />
                </label>
              </Box>
              <Flex justify="end" gap="3" mt="5">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Reset Email</Button>
                </Dialog.Close>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="password">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Password
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="Enter current password"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    New Password
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="Enter new password"
                  />
                </label>
              </Box>
              <Flex justify="end" gap="3" mt="5">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Reset Password</Button>
                </Dialog.Close>
              </Flex>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
