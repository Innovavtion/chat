import * as Tabs from "@radix-ui/react-tabs";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.Container}>
      <Tabs.Root className={styles.TabsRoot} defaultValue="tab1">
        <Tabs.List className={styles.TabsList} aria-label="Manage your account">
          <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
            Singin
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
            Signup
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={styles.TabsContent} value="tab1">
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="email">
              Email
            </label>
            <input className={styles.Input} id="email" defaultValue="" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="password">
              Password
            </label>
            <input className={styles.Input} id="password" defaultValue="" />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button className={styles.Button}>Login</button>
          </div>
        </Tabs.Content>
        <Tabs.Content className={styles.TabsContent} value="tab2">
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="login">
              Login
            </label>
            <input className={styles.Input} id="login" type="text" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="email">
              Email
            </label>
            <input className={styles.Input} id="email" type="email" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="firstName">
              First name
            </label>
            <input className={styles.Input} id="firstName" type="text" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="lastName">
              Last name
            </label>
            <input className={styles.Input} id="lastName" type="text" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="password">
              Password
            </label>
            <input className={styles.Input} id="password" type="password" />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              className={styles.Input}
              id="confirmPassword"
              type="password"
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button className={styles.Button}>Registration</button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
