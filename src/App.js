import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CreatePage} from "./page/CreatePage";
import {RedirectPage} from "./page/RedirectPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<RedirectPage/>}/>
          <Route path={"/create"} element={<CreatePage/>}/>
          <Route path={"/:key"} element={<RedirectPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
