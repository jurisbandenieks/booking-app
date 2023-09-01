import { auth } from "../../config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Divider, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, loading]);

  const signInWithEmail: SubmitHandler<Inputs> = async ({
    email,
    password
  }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithRedirect(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const res = await signInWithRedirect(auth, facebookProvider);
      console.log(res);
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
            type="text"
            error={!!errors.email}
            margin="normal"
            {...(register("email"), { required: true })}
            aria-label="email login input"
          />

          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            type="password"
            error={!!errors.password}
            margin="normal"
            {...(register("password"), { required: true })}
            aria-label="password login input"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "24px",
              margin: "24px 0"
            }}
          >
            <Button variant="outlined">Sign up</Button>
            <Button variant="contained" type="submit">
              Sign in
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
