import {
  Box,
  TextArea,
  DropdownMenu,
  Button,
  ScrollArea,
} from "@radix-ui/themes";
import { FaceIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

import styles from "./input.module.css";
import { useAppDispatch } from "@/store/store";
import { CreateMessage } from "@/services/chat.service";
import { createMessageChat, selectDialog } from "@/store/slice/dialog.slice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SocketService } from "@/services/socket/socket.service";

const ChatEmoji: Array = [
  { emoji: "🤣" },
  { emoji: "😊" },
  { emoji: "❤️" },
  { emoji: "😍" },
  { emoji: "😒" },
  { emoji: "👌" },
  { emoji: "😘" },
  { emoji: "💕" },
  { emoji: "😁" },
  { emoji: "👍" },
  { emoji: "🤣" },
  { emoji: "😊" },
  { emoji: "❤️" },
  { emoji: "😍" },
  { emoji: "😒" },
  { emoji: "👌" },
  { emoji: "😘" },
  { emoji: "💕" },
  { emoji: "😁" },
  { emoji: "👍" },
];

export default function Input() {
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispatch();
  const dialog = useSelector(selectDialog);

  function createMessage() {
    if (text.trim() !== "") {
      const dataMessage: CreateMessage = {
        chatId: String(dialog.chat?.id),
        message: text,
        otherUserId: String(dialog.currentChatUser?.id),
      };
      dispatch(createMessageChat(dataMessage)).then((e) => {
        SocketService.createMessage(e.payload);
      });
      setText("");
    }
  }

  return (
    <Box className={styles.SectionInputMessage}>
      <TextArea
        placeholder="Write message"
        style={{
          width: "100%",
          minHeight: "25px",
          height: "100%",
          boxShadow: "none",
        }}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        className={styles.TextAreaMessage}
        size="3"
      />
      <Box style={{ display: "flex" }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              style={{ height: "100%", boxShadow: "none" }}
              className={styles.ButtonMessage}
              variant="outline"
              color="gray"
            >
              <FaceIcon width="20" height="20" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className={styles.DropdownMenuEmoji}
            side="top"
            align="center"
          >
            <ScrollArea type="hover" scrollbars="vertical">
              {ChatEmoji.map((emoji, index) => (
                <Button
                  color="gray"
                  style={{ background: "none", cursor: "pointer" }}
                  onClick={() => setText(`${text}${emoji.emoji}`)}
                  key={index}
                >
                  {emoji.emoji}
                </Button>
              ))}
            </ScrollArea>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button
          onClick={() => createMessage()}
          style={{ height: "100%", boxShadow: "none" }}
          className={styles.ButtonMessage}
          variant="outline"
          color="gray"
        >
          <PaperPlaneIcon width="20" height="20" />
        </Button>
      </Box>
    </Box>
  );
}
