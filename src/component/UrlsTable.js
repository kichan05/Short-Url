import {GoPaste, GoTrash} from "react-icons/go";

const UrlsTable = ({urls, removeUrl}) => {
  return (
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
      {
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
                removeUrl(url.key)
              }}/>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default UrlsTable