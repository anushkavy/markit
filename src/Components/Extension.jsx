import { useEffect, useState } from "react";
import { summarize_document } from "../anthropic";
import LoginExtension from "./LoginExtension";

async function getCurrentTabURL() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tab.url;
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}

export default function Extension({ genAiBookmarkInfo, setGenAiBookmarkInfo }) {
  const [bookmarkData, setBookmarkData] = useState({
    link: "",
    websiteText: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("userId")) || false
  );

  useEffect(() => {
    const fetchCurrentTabURL = async () => {
      const url = await getCurrentTabURL();
      setBookmarkData((prev) => ({ ...prev, link: url }));
    };

    fetchCurrentTabURL();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setBookmarkData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function getAiInfo(Text) {
    const bookmarkInfo = await summarize_document(Text);
    setGenAiBookmarkInfo(bookmarkInfo);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const tabId = await getCurrentTab();

    await chrome.scripting.executeScript(
      {
        target: { tabId },
        func: () => document.body.innerText, // Extract innerText from the webpage
      },
      (results) => {
        if (results && results[0]?.result) {
          setBookmarkData((prev) => ({
            ...prev,
            websiteText: results[0].result, // Save the extracted text
          }));
          getAiInfo(results[0].result);
        }
      }
    );
  }

  useEffect(() => {
    if (!genAiBookmarkInfo) return;
    const info = JSON.parse(genAiBookmarkInfo);
    setGenAiBookmarkInfo(info);
  }, [genAiBookmarkInfo]);

  return isLoggedIn ? (
    <div className="extension-main">
      <header>
        <h3>PINPOINT</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          className="link-input"
          type="text"
          name="link"
          value={bookmarkData.link}
          onChange={handleChange}
          disabled
        />
        <div className="main-btns">
          <button className="extension-btn"> View All</button>

          <button
            className="extension-btn save-btn"
            type="submit"
            // onClick={() => {
            //   chrome.tabs.create({
            //     url: "https://plumgoodness.com/blogs/skincare/morning-skincare-routine",
            //   });
            // }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  ) : (
    <LoginExtension setIsLoggedIn={setIsLoggedIn} />
  );
}
