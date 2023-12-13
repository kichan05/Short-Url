import {useEffect, useState} from "react";
import {setDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import UrlsTable from "../component/UrlsTable";

export const collectionPath = "shortUrl";

export const CreatePage = () => {
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
      const docRef = await setDoc(doc(db, collectionPath, inputs.key), data)
      console.log("좀!!")
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
      result.push({...doc.data()})
    })
    setUrls(result)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <section className="page">
      <div className="urls-wrap-wrap">
        <UrlsTable urls={urls} removeUrl={handleRemove}/>
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
  )
}