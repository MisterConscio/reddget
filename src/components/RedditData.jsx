import { useState, useEffect } from 'react'

const RedditData = ({ subreddit }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [viewimage, setViewimage] = useState(null);

  useEffect(() => {
    fetchData()
  }, [subreddit])

  useEffect(() => {
    if (viewimage) {
      document.body.classList.add('overlay-open')
    } else {
      document.body.classList.remove('overlay-open')
    }
  }, [viewimage])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/hot.json?&t=all&limit=100`
      )
      if (!response.ok) {
        throw new Error("Error while fetching the api")
      }
      const jsonData = await response.json()
      const postData = jsonData.data.children
      const fmtData = postData.map((post) => {
        const { id, title, url } = post.data
        return { id, title, url }
      })
      const filteredData = fmtData.filter((item) => {
        const urlLowercase = item.url.toLowerCase()
        return (
          urlLowercase.endsWith('.jpg') ||
          urlLowercase.endsWith('.png') ||
          urlLowercase.endsWith('.jpeg')
        )
      })
      setData(filteredData)
      setError(null)
    } catch (error) {
      console.error(error)
      setError("Error while fetching the api")
    }
  }

  const handleImageClick = (url) => {
    setViewimage(url)
  }

  const handleImageClose = () => {
    setViewimage(null)
  }

  return (
    <>
      {error ? (
        <p className="error-msg">{subreddit} wasn't found :/</p>
      ) : (
        <div className="img-gallery">
          {data.map((item) => (
            <div className="img-gallery-item" key={item.id}>
              <img
                src={item.url}
                alt="muh image"
                title={item.title}
                onClick={() => handleImageClick(item.url)}
              />
            </div>
          ))}
        </div>
      )}
      {viewimage && (
        <div onClick={handleImageClose} className="overlay">
          <button onClick={handleImageClose}>X</button>
          <img src={viewimage} alt="muh image" />
        </div>
      )}
    </>
  )
}

export default RedditData
