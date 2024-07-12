import {
  Box,
  TextArea,
  DropdownMenu,
  Button,
  ScrollArea,
} from "@radix-ui/themes";
import { FaceIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

import styles from "./input.module.css";

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
              {ChatEmoji.map((emoji) => (
                <Button
                  color="gray"
                  style={{ background: "none", cursor: "pointer" }}
                >
                  {emoji.emoji}
                </Button>
              ))}
            </ScrollArea>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button
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
