const Notification = ({ message, color }) => {
  const styles = { borderColor: color, color: color }
  
  return (
    <p className="notification" style={styles}>
      {message}
    </p>
  )
}

export default Notification