import { useState } from 'react'
import './main.css'

import RedditData from './components/RedditData'
import RedditForm from './components/RedditForm'

function App() {
  const [subreddit, setSubreddit] = useState('')

  const handleFormSubmit = (subredditName) => {
    setSubreddit(subredditName)
  }

  return (
    <>
      <header>
        <h1>ReddGet</h1>
        <RedditForm onSubmit={handleFormSubmit} />
      </header>
      <main>
        {subreddit && <RedditData subreddit={subreddit} />}
      </main>
    </>
  )
}

export default App
