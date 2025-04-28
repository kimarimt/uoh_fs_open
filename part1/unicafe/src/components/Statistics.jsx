const Statistics = ({ good, bad, neutral }) => {
  const totalReviews = good + bad + neutral
  const averageReviews = (good - bad) / totalReviews
  const postiveRviews = good / totalReviews * 100

  return (
    <div>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {totalReviews}<br />
      average {averageReviews}<br />
      positive {postiveRviews}%
    </div>
  )
}

export default Statistics