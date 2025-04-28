import StatisticLine from './StatisticLine'

const Statistics = ({ good, bad, neutral }) => {
  const totalReviews = good + bad + neutral
  const averageReviews = (good - bad) / totalReviews
  const postiveRviews = good / totalReviews * 100

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={totalReviews} />
      <StatisticLine text="average" value={averageReviews} />
      <StatisticLine text="positive" value={postiveRviews} />
    </div>
  )
}

export default Statistics