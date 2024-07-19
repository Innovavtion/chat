import { Box, Text, Avatar, Skeleton } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import UserModal from "@/components/modal/user/userModal";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";

import { logout } from "@/store/slice/auth.slice";

import styles from "./authuser.module.css";
import { useSelector } from "react-redux";
import { getAuthUserInfo, selectUser } from "../../../store/slice/user.slice";
import { useEffect } from "react";

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
    <Box
      className={styles.SectionUser}
      style={{ justifyContent: "space-between" }}
    >
      <Box
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Skeleton loading={userInfo.status === "loading" ? true : false}>
          <Avatar
            size="4"
            src={userInfo.user?.avatar}
            fallback={userInfo.user?.firstName.charAt(0)}
            radius="full"
          />
        </Skeleton>
        <Box className={styles.YourInfo}>
          <Text className={styles.Fio} size="3" weight="bold">
            <Skeleton loading={userInfo.status === "loading" ? true : false}>
              {userInfo.user?.firstName + " "}
              {userInfo.user?.lastName}
            </Skeleton>
          </Text>
          <Text className={styles.UserStatus} size="2">
            <Skeleton loading={userInfo.status === "loading" ? true : false}>
              В сети
            </Skeleton>
          </Text>
        </Box>
      </Box>
      <Box
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0 15px",
          alignContent: "flex-end",
          marginRight: "10px",
        }}
      >
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
