import {
  UpdateUserEmail,
  UpdateUserName,
  UpdateUserPassword,
} from "@/services/user.service";
import {
  getAuthUserInfo,
  selectUser,
  updateAvatar,
  updateEmail,
  updateName,
  updatePassword,
} from "@/store/slice/user.slice";
import { useAppDispatch } from "@/store/store";
import { GearIcon, UploadIcon } from "@radix-ui/react-icons";
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./user.module.css";

const ValidateName = z.object({
  firstName: z
    .string()
    .nonempty("This string don't any empty")
    .min(3, { message: "Must be 3 or more characters long" }),
  lastName: z
    .string()
    .nonempty("This string don't any empty")
    .min(3, { message: "Must be 3 or more characters long" }),
});

function FormNameHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserName>({
    resolver: zodResolver(ValidateName),
  });

  async function updateUserName(e: UpdateUserName) {
    try {
      dispatch(updateName(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitName: handleUpdateName,
    DataName: register,
    ErrorName: errors,
  };
}

const ValidateEmail = z.object({
  email: z.string().nonempty("This string don't any empty").email(),
  password: z.string().nonempty("This string don't any empty"),
});

function FormEmailHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserEmail>({
    resolver: zodResolver(ValidateEmail),
  });

  async function updateUserName(e: UpdateUserEmail) {
    try {
      dispatch(updateEmail(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitEmail: handleUpdateName,
    DataEmail: register,
    ErrorEmail: errors,
  };
}

const ValidatePassword = z.object({
  newPassword: z
    .string()
    .nonempty("This string don't any empty")
    .min(7, { message: "Must be 7 or more characters long" }),
  oldPassword: z.string().nonempty("This string don't any empty"),
});

function FormPasswordHooks() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserPassword>({
    resolver: zodResolver(ValidatePassword),
  });

  async function updateUserName(e: UpdateUserPassword) {
    try {
      dispatch(updatePassword(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateName = handleSubmit((e) => updateUserName(e));

  return {
    SubmitPassword: handleUpdateName,
    DataPassword: register,
    ErrorPassword: errors,
  };
}

function ValidateAvatar() {
  const dispatch = useAppDispatch();

  const [avatarValidate, setAvatarValidate] = useState(null);
  const [errorValidate, serErrorValidate] = useState(null);

  const validateFormat = (file: File) => {
    const validExtensions = ["png", "jpg", "jpeg"];
    const fileExtensions = file.type.split("/")[1];
    return validExtensions.includes(fileExtensions);
  };

  const validateFileSize = (file: File) => {
    const fileZise = file.size / 1024 / 1024;
    if (fileZise > 1) {
      console.log("file много весит");
      return false;
    } else {
      return true;
    }
  };

  const fileChange = (e) => {
    const file = e.target.files[0];

    if (validateFormat(file) && validateFileSize(file)) {
      const readUrl = URL.createObjectURL(file);
      setAvatarValidate(readUrl);
    } else {
      console.log("file не соответсвует требованиям");
    }
  };

  const saveAvatar = (e) => {
    console.log(e);
    const file = e.target[0].files[0];
    const formData = new FormData();
    formData.append("file", file);
    dispatch(updateAvatar(formData));
  };

  const clearImage = () => {
    if (avatarValidate !== null) {
      console.log("clear avatar");
      setAvatarValidate(null);
    }
  };

  return {
    AvatarData: avatarValidate,
    ErrorData: errorValidate,
    FileChange: fileChange,
    SaveAvatar: saveAvatar,
    ClearAvatar: clearImage,
  };
}

export default function UserModal() {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUser);

  const { SubmitName, DataName, ErrorName } = FormNameHooks();
  const { SubmitEmail, DataEmail, ErrorEmail } = FormEmailHooks();
  const { SubmitPassword, DataPassword, ErrorPassword } = FormPasswordHooks();
  const { AvatarData, FileChange, SaveAvatar, ClearAvatar } = ValidateAvatar();

  const updateAccount = (e) => {
    e.preventDefault();
    SubmitName(e);
    SaveAvatar(e);
  };

  useEffect(() => {
    dispatch(getAuthUserInfo());
  }, [dispatch]);

  return (
    <Dialog.Root onOpenChange={ClearAvatar}>
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
              <form
                onSubmit={(e) => {
                  updateAccount(e);
                }}
              >
                <Flex direction="row" gap="3">
                  <Box className={styles.BoxUploadAvatar}>
                    <input
                      className={styles.InputUploadAvatar}
                      name="avatar"
                      type="file"
                      id="upload_avatar"
                      accept="image/png"
                      onChange={(e) => FileChange(e)}
                    />
                    <label htmlFor="upload_avatar">
                      <Box className={styles.BoxAvatar}>
                        <Avatar
                          className={styles.UploadAvatar}
                          size="8"
                          src={
                            AvatarData === null
                              ? userInfo.user?.avatar
                              : AvatarData
                          }
                          radius="full"
                          fallback={userInfo.user?.firstName.charAt(0)}
                        />
                      </Box>
                    </label>
                  </Box>
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
                        Имя
                      </Text>
                      <TextField.Root
                        {...DataName("firstName")}
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={userInfo.user?.firstName}
                      />
                      {ErrorName.firstName && (
                        <label className={styles.Validation}>
                          {ErrorName.firstName?.message}
                        </label>
                      )}
                    </label>
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Фамилия
                      </Text>
                      <TextField.Root
                        {...DataName("lastName")}
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={userInfo.user?.lastName}
                      />
                      {ErrorName.lastName && (
                        <label className={styles.Validation}>
                          {ErrorName.lastName?.message}
                        </label>
                      )}
                    </label>
                  </Box>
                </Flex>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Save</Button>
                </Flex>
              </form>
            </Tabs.Content>

            <Tabs.Content value="email">
              <form onSubmit={SubmitEmail}>
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
                      value={userInfo.user?.email}
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
                      {...DataEmail("email")}
                      defaultValue=""
                      placeholder="New email"
                      type="email"
                    />
                    {ErrorEmail.email && (
                      <label className={styles.Validation}>
                        {ErrorEmail.email?.message}
                      </label>
                    )}
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Current Password
                    </Text>
                    <TextField.Root
                      {...DataEmail("password")}
                      defaultValue=""
                      placeholder="Enter current password"
                      type="password"
                    />
                    {ErrorEmail.password && (
                      <label className={styles.Validation}>
                        {ErrorEmail.password?.message}
                      </label>
                    )}
                    {userInfo.status === "failed" && (
                      <label className={styles.Validation}>
                        This uncorrected password
                      </label>
                    )}
                  </label>
                </Box>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Reset Email</Button>
                </Flex>
              </form>
            </Tabs.Content>

            <Tabs.Content value="password">
              <form onSubmit={SubmitPassword}>
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
                      New Password
                    </Text>
                    <TextField.Root
                      {...DataPassword("newPassword")}
                      type="password"
                      placeholder="Enter new password"
                    />
                    {ErrorPassword.newPassword && (
                      <label className={styles.Validation}>
                        {ErrorPassword.newPassword?.message}
                      </label>
                    )}
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Current Password
                    </Text>
                    <TextField.Root
                      {...DataPassword("oldPassword")}
                      type="password"
                      placeholder="Enter current password"
                    />
                    {ErrorPassword.oldPassword && (
                      <label className={styles.Validation}>
                        {ErrorPassword.oldPassword?.message}
                      </label>
                    )}
                    {userInfo.status === "failed" && (
                      <label className={styles.Validation}>
                        This uncorrected password
                      </label>
                    )}
                  </label>
                </Box>
                <Flex justify="end" gap="3" mt="5">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button>Reset Password</Button>
                </Flex>
              </form>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
