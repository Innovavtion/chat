import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "@/store/store";

import { Box, Text } from "@radix-ui/themes";
import { login, selectAuth } from "@/store/slice/auth.slice";
import { SignInData } from "@/services/auth.service";
import styles from "./signin.module.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";

const schemaSignValidate = z.object({
  email: z.string().nonempty("This string don't any empty").email(),
  password: z.string().nonempty("This string don't any empty"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxError = useSelector(selectAuth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(schemaSignValidate),
  });

  async function fetchSignin(e: SignInData) {
    try {
      dispatch(login(e)).then((result) => {
        if (result.payload) {
          navigate("/chat");
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  const handleSignIn = handleSubmit((e) => fetchSignin(e));

  return (
    <Box className={styles.Container}>
      <Box className={styles.SignInContainer}>
        <Box className={styles.SignInForms}>
          <Box className={styles.Title}>
            <Text>Sign in</Text>
          </Box>
          <form onSubmit={handleSignIn}>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                className={styles.Input}
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              {errors.email && (
                <label className={styles.Validation}>
                  {errors.email?.message}
                </label>
              )}
              {reduxError.status === "failed" && (
                <label className={styles.Validation}>{reduxError.error}</label>
              )}
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                className={styles.Input}
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              {errors.password && (
                <label className={styles.Validation}>
                  {errors.password?.message}
                </label>
              )}
              {reduxError.status === "failed" && (
                <label className={styles.Validation}>{reduxError.error}</label>
              )}
            </fieldset>
            <Link className={styles.Link} to="/signup">
              Don't have an account?
            </Link>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <button className={styles.Button}>Sign in</button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
