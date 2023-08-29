import { Routing } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavBar } from "./components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

const queryClient = new QueryClient();
const theme = createTheme({
  typography: { fontFamily: ["Roboto", "sans-serif"].join(",") }
});

function App() {
  const { user } = useAuth0();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <p>{user?.email ?? ""}</p>
        <Routing />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
