import { useState } from "react"
import Button from "./components/Button"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button title="good" onClick={() => setGood(good + 1)} />
      <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" onClick={() => setBad(bad + 1)} />
      <h2>Statistics</h2>
      <div>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}
      </div>
    </>
  )
}

export default App