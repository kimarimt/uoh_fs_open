import StatisticLine from './StatisticLine'

const Statistics = ({ good, bad, neutral }) => {
  const totalReviews = good + bad + neutral
  const averageReviews = ((good - bad) / totalReviews).toFixed(1)
  const postiveReviews = (good / totalReviews * 100).toFixed(1)

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalReviews} />
        <StatisticLine text="average" value={averageReviews} />
        <StatisticLine text="positive" value={`${postiveReviews}%`} />
      </tbody>
    </table>
  )
}

export default Statistics