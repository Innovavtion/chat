import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slice/auth.slice";
import { getAuthUserInfo, selectUser } from "@/store/slice/user.slice";

import UserModal from "@/components/modal/user/userModal";

import { Box, Text, Avatar, Skeleton } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";

import styles from "./user.module.css";

export default function AuthUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUser);

  useEffect(() => {
    dispatch(getAuthUserInfo());
  }, [dispatch]);

  async function logoutUser() {
    dispatch(logout()).then(() => {
      navigate("/signin");
    });
  }

  return (
    <Box className={styles.SectionUser}>
      <Box className={styles.ContentUser}>
        <Skeleton loading={userInfo.status === "loading" ? true : false}>
          <Avatar
            size="4"
            radius="full"
            src={userInfo.user?.avatar}
            fallback={userInfo.user?.firstName.charAt(0)}
          />
        </Skeleton>
        <Box className={styles.YourInfo}>
          <Text size="3" weight="bold">
            <Skeleton loading={userInfo.status === "loading" ? true : false}>
              {`${userInfo.user?.firstName} ${userInfo.user?.lastName}`}
            </Skeleton>
          </Text>
          <Text className={styles.UserStatus} size="2">
            <Skeleton loading={userInfo.status === "loading" ? true : false}>
              В сети
            </Skeleton>
          </Text>
        </Box>
      </Box>
      <Box className={styles.Settings}>
        <ExitIcon
          width="20"
          height="20"
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => logoutUser()}
        />
        <UserModal />
      </Box>
    </Box>
  );
}
