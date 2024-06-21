import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./App.module.css";

import Routers from "./routers/index.tsx";

export default function App() {
  return (
    <Theme appearance="light" accentColor="blue" grayColor="sand">
      <Routers />
      <ThemePanel />
    </Theme>
  );
}
