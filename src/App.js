import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {collectionPath, CreatePage} from "./page/CreatePage";
import {collection, getDoc, doc} from "firebase/firestore";
import {useEffect} from "react";
import {db} from "./firebase";

const Root = () => {
  const key = window.location.pathname.slice(1)

  useEffect(() => {
    getDoc(doc(db, collectionPath, key))
      .then(data => {
        if(data === undefined){
          window.location.href = "https://kichan.dev"
        }
        else {
          window.location.href = data.data().url
        }
      })
      .catch(e => {
        window.location.href = "https://kichan.dev"
      })
  }, [])

  return (
    <section>

    </section>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Root/>}/>
          <Route path={"/create"} element={<CreatePage/>}/>
          <Route path={"*"} element={<Root/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
