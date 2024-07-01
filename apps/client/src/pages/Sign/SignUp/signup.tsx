import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";

import { Box, Text } from "@radix-ui/themes";
import { register as reduxRegister } from "@/store/slice/auth.slice";
import { SignUpData } from "@/services/auth.service";
import styles from "./signup.module.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schemaSignValidate = z
  .object({
    login: z
      .string()
      .nonempty("This string don't any empty")
      .min(5, { message: "Must be 5 or more characters long" }),
    email: z.string().nonempty("This string don't any empty").email(),
    firstName: z
      .string()
      .nonempty("This string don't any empty")
      .min(3, { message: "Must be 3 or more characters long" }),
    lastName: z
      .string()
      .nonempty("This string don't any empty")
      .min(3, { message: "Must be 3 or more characters long" }),
    password: z
      .string()
      .nonempty("This string don't any empty")
      .min(7, { message: "Must be 7 or more characters long" }),
    passwordRepeat: z.string().nonempty("This string don't any empty"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Password must match",
    path: ["passwordRepeat"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(schemaSignValidate),
  });

  async function fetchSignup(e: SignUpData) {
    try {
      dispatch(reduxRegister(e))
        .then((result) => {
          if (result.payload) {
            navigate("/signin");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
    }
  }

  const handleSignUp = handleSubmit((e) => fetchSignup(e));

  return (
    <Box className={styles.Container}>
      <Box className={styles.SignUpContainer}>
        <Box className={styles.SignUpForms}>
          <Box className={styles.Title}>
            <Text>Sign up</Text>
          </Box>
          <form onSubmit={handleSignUp}>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="login">
                Login
              </label>
              <input
                {...register("login")}
                className={styles.Input}
                id="login"
                name="login"
                type="text"
                placeholder="Enter login"
              />
              {errors.login && (
                <label className={styles.Validation}>
                  {errors.login?.message}
                </label>
              )}
            </fieldset>
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
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="firstName">
                First name
              </label>
              <input
                {...register("firstName")}
                className={styles.Input}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <label className={styles.Validation}>
                  {errors.firstName?.message}
                </label>
              )}
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="lastName">
                Last name
              </label>
              <input
                {...register("lastName")}
                className={styles.Input}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <label className={styles.Validation}>
                  {errors.lastName?.message}
                </label>
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
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                {...register("passwordRepeat")}
                className={styles.Input}
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                placeholder="Repeat password"
              />
              {errors.passwordRepeat && (
                <label className={styles.Validation}>
                  {errors.passwordRepeat?.message}
                </label>
              )}
            </fieldset>
            <Link className={styles.Link} to="/signin">
              You have an account?
            </Link>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <button className={styles.Button}>Sign up</button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
