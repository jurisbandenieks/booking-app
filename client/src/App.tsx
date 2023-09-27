import { Routing } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const queryClient = new QueryClient();
const theme = createTheme({
  typography: { fontFamily: ["Roboto", "sans-serif"].join(",") }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
