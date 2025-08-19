import "./App.css";
import { CategorySelect } from "./components/CategorySelect";
import { QueryInput } from "./components/QueryInput";
import { NewsDisplay } from "./components/NewsDisplay";
import { FetchNewsButton } from "./components/FetchNewsButton";

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src="/logo.svg" alt="News Scanner Logo" className="logo" />
        <div className="header-title">News Scanner</div>
      </header>
      <div className="filters">
        <QueryInput
        // value={}
        // onChange={}
        />

        <CategorySelect
        // options={}
        // selectedOptions={}
        // onChange={}
        />

        <FetchNewsButton
        // onClick={}
        />
      </div>
      <NewsDisplay />
    </div>
  );
}

export default App;
