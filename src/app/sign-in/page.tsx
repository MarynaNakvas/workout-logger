"use client";

import { FC, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { EMAIL_REGEXP } from "@/utils/validation";
import { loginRequest } from "@/lib/msal/msal-config";
import { User } from "@/models";
import Spinner from "@/components/spinner";
import { useRootStore } from "@/hooks/useStore";

interface FormInitialValues {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
}

const initialState: FormInitialValues = {
  email: "",
  password: "",
  emailError: null,
  passwordError: null,
};

const SignIn: FC = observer(() => {
  const { instance } = useMsal();
  const router = useRouter();
  const { userStore } = useRootStore();

  const [user, setUser] = useState(initialState);

  const handleChangeEmail = (email: any) => {
    setUser((prevValue) => ({ ...prevValue, email }));
    if (email) {
      setUser((prevValue) => ({
        ...prevValue,
        emailError: !EMAIL_REGEXP.test(email) ? "Invalid e-mail" : null,
      }));
    }
  };

  const handleChangePassword = (password: any) => {
    setUser((prevValue) => ({ ...prevValue, password }));
    if (password) {
      setUser((prevValue) => ({
        ...prevValue,
        passwordError:
          password.length < 6
            ? "Password contains at least 6 characters"
            : null,
      }));
    }
  };

  const handleSignIn = () => {
    if (!user.email) {
      setUser((prevValue) => ({
        ...prevValue,
        emailError: "Required field",
      }));
    }
    if (!user.password) {
      setUser((prevValue) => ({
        ...prevValue,
        passwordError: "Required field",
      }));
    }
    if (
      user.email &&
      user.password &&
      !user.emailError &&
      !user.passwordError
    ) {
      const isNewUser = userStore.checkIsNewUser(user.email);
      const currentUser = {
        email: user.email,
        password: user.password,
      } as User;
      !isNewUser
        ? userStore.addUser(currentUser)
        : userStore.setUser(isNewUser);
    }
  };

  const handleSignInWithMicrosoft = () => {
    instance.loginRedirect(loginRequest);
    localStorage.setItem("account", "true");
  };

  const account = localStorage.getItem("account");

  useEffect(() => {
    if (userStore.accessToken) {
      router.push("/dashboard");
    }
  }, [userStore.accessToken]);

  useEffect(() => {
    if (!!account) {
      router.push("/account");
    }
  }, [account]);

  useEffect(() => {
    userStore.fetchUsers();
    userStore.loadUser();
  }, []);

  return (
    <div className="h-screen bg-primary text-text flex items-center justify-center">
      <Spinner isLoading={!!account && !userStore.accessToken}>
        <div className="w-full min-h-screen p-8 bg-gray-800 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center">Workout Logger</h2>

          <form className="flex flex-col gap-5 mt-52">
            <div>
              <label htmlFor="email" className="block text-reg">
                Email
              </label>
              <input
                className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                id="email"
                placeholder="Email"
                onChange={(e) => handleChangeEmail(e.target.value)}
                value={user.email}
              />
              {user.emailError && (
                <div className="text-red">{user.emailError}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-reg text-text">
                Password
              </label>
              <input
                className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                id="password"
                placeholder="Password"
                onChange={(e) => handleChangePassword(e.target.value)}
                value={user.password}
              />
              {user.passwordError && (
                <div className="text-red">{user.passwordError}</div>
              )}
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 text-button bg-button-dark rounded-md text-secondary focus:outline-none"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>

          <div className="mt-5">
            <button
              className="w-full py-3 px-4 text-button bg-button-dark rounded-md text-secondary focus:outline-none"
              onClick={handleSignInWithMicrosoft}
            >
              Sign in with Microsoft
            </button>
          </div>
        </div>
      </Spinner>
    </div>
  );
});

export default SignIn;
