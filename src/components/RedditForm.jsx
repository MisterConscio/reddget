import { useState } from 'react'

const RedditForm = ({ onSubmit }) => {
  const [subreddit, setSubreddit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(subreddit)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subredd">Subreddit:</label>
        <input
          id="subredd"
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="Enter a subreddit name"
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
  )
}

export default RedditForm
