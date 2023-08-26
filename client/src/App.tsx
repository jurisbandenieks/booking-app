import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const checkServer = async () => {
      const { data } = await axios.get("api/");
      console.log(data);
    };

    checkServer();
  }, []);

  return <>Booking App</>;
}

export default App;
