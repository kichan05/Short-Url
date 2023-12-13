import './App.css';

import {collection, addDoc, getDocs, deleteDoc, doc} from "firebase/firestore"
import {db} from "./firebase"
import {useEffect, useState} from "react";
import {GoPaste, GoTrash} from "react-icons/go";


function App() {
  const collectionPath = "shortUrl";

  const [urls, setUrls] = useState([])
  const [inputs, setInputs] = useState({
    name: "", url: "", key: ""
  })
  const handleInputs = (e) => {
    const {name, value} = e.target
    setInputs({...inputs, [name]: value})
  }
  const handleSubmit = async (e) => {
    if (inputs.name === "" || inputs.url === "")
      return

    const data = {...inputs}

    try {
      const docRef = await addDoc(collection(db, collectionPath), data)
      setInputs({name: "", url: "", key: ""})
      await getData()
    } catch (e) {
    }
  }
  const handleRemove = async (id) => {
    await deleteDoc(doc(db, collectionPath, id))
    getData()
    alert("삭제 완료")
  }

  async function getData() {
    let result = [];

    (await getDocs(collection(db, collectionPath))).forEach(doc => {
      result.push({...doc.data(), id: doc.id})
    })
    setUrls(result)
  }

  const UrlsTableBody = ({urls, removeUrl}) => {
    return (
      urls.map((url, index) => (
        <tr className="row">
          <td>{index}</td>
          <td>{url.name}</td>
          <td>{url.key}</td>
          <td
            className={"url"}
            onClick={() => {
              window.open(url.url)
            }}>
            {url.url}
          </td>
          <td className="buttons">
            <GoPaste
              onClick={() => {
                navigator.clipboard.writeText(url.url)
              }}
            />
            <GoTrash onClick={() => {
              removeUrl(url.id)
            }}/>
          </td>
        </tr>
      ))
    )
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      <section className="page">
        <div className="urls-wrap-wrap">
          <table className="urls-wrap">
            <thead>
            <tr>
              <th style={{width: "5%"}}>#</th>
              <th style={{width: "20%"}}>이름</th>
              <th style={{width: "20%"}}>Key</th>
              <th style={{width: "45%"}}>URL</th>
              <th style={{width: "10%"}}>*</th>
            </tr>
            </thead>
            <tbody>
              <UrlsTableBody urls={urls} removeUrl={handleRemove}/>
            </tbody>
          </table>
        </div>
        <div className="input-wrap">
          <input
            name="name" value={inputs.name}
            placeholder={"이름"}
            onChange={handleInputs}/>
          <input
            name="url" value={inputs.url}
            placeholder={"URL"}
            onChange={handleInputs}/>
          <input
            name="key" value={inputs.key}
            placeholder={"키 (key)"}
            onChange={handleInputs}/>
          <button onClick={handleSubmit}>등록</button>
        </div>
      </section>
    </div>
  );
}

export default App;
