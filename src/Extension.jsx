import { useState } from "react"
import { get_details, summarize_document } from "./anthropic";

function getURL() {
    const [tab] = chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        return tabs[0].url
    });
}
export default function Extension(){
    const [bookmarkData, setBookmarkData] = useState({
        link: getURL()
    })


    // const websiteText = get_details()

    function handleChange(event) {
    const { name, value } = event.target;
    setBookmarkData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault()
   const bookmarkInfo =  await summarize_document(websiteText);
   console.log(bookmarkInfo)
  }

    return(
        <div className="extension-main">
            <header>
                <h3>PINPOINT</h3>
            </header>
            <form onSubmit={handleSubmit}>
                <input className="link-input" type="text" name="link" value={bookmarkData.link} onChange={handleChange}/>
                <div className="main-btns">
                    <button className="extension-btn"> View All</button>
                    <button className="extension-btn save-btn" type="submit">Save</button>
                </div>    
            </form>

        </div>
    )
}