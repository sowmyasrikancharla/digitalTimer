// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    isPlaying: false,
    limit: 25,
    isTimerCompleted: false,
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const {isPlaying, minutes, seconds, isTimerCompleted} = this.state
    if (minutes === 0 && seconds === 0) {
      this.setState({isPlaying: false, minutes: 0, seconds: 0})
    }
    if (isPlaying === true) {
      if (seconds === 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 60,
        }))
      }
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onTogglePlay = () => {
    this.setState(prevState => {
      const {isPlaying} = prevState
      return {
        isPlaying: !isPlaying,
      }
    })
  }

  decrement = () => {
    const {isPlaying} = this.state
    if (isPlaying === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        limit: prevState.limit - 1,
      }))
    }
  }

  increment = () => {
    const {isPlaying} = this.state
    if (isPlaying === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        limit: prevState.limit + 1,
      }))
    }
  }

  reset = () => {
    this.setState({minutes: 25, seconds: 0, limit: 25, isPlaying: false})
  }

  render() {
    const {minutes, seconds, isPlaying, limit} = this.state

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    const stringifiedLimits = limit > 9 ? limit : `0${limit}`

    return (
      <div className="con">
        <h1 className="head">Digital Timer</h1>
        <div className="sub-con">
          <div className="bg-con">
            <div className="white-con">
              <h1 className="time">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <br />
              <p className="status">{isPlaying ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="sub-con2">
            <div className="right-con">
              <div className="right-con1">
                <button className="but-none" onClick={this.onTogglePlay}>
                  {isPlaying ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                      alt="pause icon"
                      className="icon-set"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
                      alt="play icon"
                      className="icon-set"
                    />
                  )}
                  {isPlaying ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="right-con1">
                <button className="but-none" onClick={this.reset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                    className="icon-set"
                  />
                  Reset
                </button>
              </div>
            </div>

            <div className="right-con2">
              <p className="sm-text"> Set timer limit</p>
            </div>
            <div className="right-con3">
              <button onClick={this.decrement} className="but">
                -
              </button>
              <div className="timer-con">
                <p>{stringifiedLimits}</p>
              </div>
              <button onClick={this.increment} className="but">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
