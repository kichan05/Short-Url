import {useEffect} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {collectionPath} from "./CreatePage";
import {useParams} from "react-router-dom";

export const RedirectPage = () => {
  const params = useParams()

  useEffect(() => {
    const key = params.key
    console.log(key)
    if(key === undefined){
      window.location.href = "https://kichan.dev"
      return
    }

    getDoc(doc(db, collectionPath, key))
      .then(data => {
        if (data === undefined) {
          window.location.href = "https://kichan.dev"
        } else {
          window.location.href = data.data().url
        }
      })
      .catch(e => {
        window.location.href = "https://kichan.dev"
      })
  }, [])

  return (
    <section>
      <h1>리다이랙트중</h1>
    </section>
  )
}