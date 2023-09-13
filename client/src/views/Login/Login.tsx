import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Divider, Button, Typography } from "@mui/material";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config";
import { Loading } from "../../components";

type Inputs = {
  email: string;
  password: string;
  repeatPassword?: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    if (!!user?.email) navigate("/");
  }, [user, loading]);

  const signInWithEmail: SubmitHandler<Inputs> = async ({
    email,
    password
  }) => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithRedirect(auth, facebookProvider);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "50%", md: "30%", lg: "25%" },
        height: {
          xs: "calc(100vh - (8px * 2))",
          sm: "calc(100vh - (16px * 2))"
        },
        margin: "0 auto",
        p: { xs: "8px", sm: "16px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Box sx={{ border: "1px black solid", p: { xs: "8px", sm: "16px" } }}>
        <Typography>Booking App</Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
          onSubmit={handleSubmit(signInWithEmail)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <TextField
            id="email-input"
            label="Email"
            variant="outlined"
            type="email"
            error={!!errors.email}
            margin="normal"
            {...register("email", { required: true })}
            aria-label="email login input"
          />

          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            type="password"
            error={!!errors.password}
            margin="normal"
            {...register("password", { required: true })}
            aria-label="password login input"
          />

          {isRegister && (
            <TextField
              id="password-repeat-input"
              label="Repeat password"
              variant="outlined"
              type="password"
              error={!!errors.password}
              margin="normal"
              {...register("repeatPassword", { required: isRegister })}
              aria-label="password repeat input"
            />
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "24px",
              margin: "24px 0"
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setIsRegister(!isRegister)}
            >
              {!isRegister ? "Sign Up" : "Cancel"}
            </Button>
            <Button variant="contained" type="submit">
              Sign {isRegister ? "up" : "in"}
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "grid", rowGap: "12px", margin: "24px 0 0" }}>
          <Button variant="outlined" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
          <Button variant="outlined" onClick={signInWithFacebook}>
            Sign in with Facebook
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
