// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isStarted: false,
    timeInSeconds: 0,
    timeInMinutes: 25,
    minutes: 25,
  }

  toggleStartPause = () => {
    const {isStarted, timeInMinutes} = this.state

    if (timeInMinutes === 0) {
      this.onReset()
    } else if (!isStarted) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
    }))
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isStarted: false,
      timeInMinutes: 25,
      timeInSeconds: 0,
      minutes: 25,
    })
  }

  increaseMin = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes + 1,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  decreaseMin = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  tick = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    console.log(timeInMinutes)
    let secs = timeInSeconds
    let min = timeInMinutes
    if (timeInSeconds === 0) {
      min -= 1
      secs = 59
    } else {
      secs -= 1
    }
    this.setState({
      timeInMinutes: min,
      timeInSeconds: secs,
    })
  }

  render() {
    const {timeInSeconds, timeInMinutes, isStarted, minutes} = this.state

    const secTime =
      timeInSeconds <= 9 ? `0${timeInSeconds}` : `${timeInSeconds}`
    const minTime =
      timeInMinutes <= 9 ? `0${timeInMinutes}` : `${timeInMinutes}`
    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="app-sub-container">
          <div className="timer-container">
            <div className="timer-bg-container">
              <h1 className="timer">
                {minTime}:{secTime}
              </h1>
              <p>{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controller-container">
            <div className="start-reset-container">
              {!isStarted && (
                <div className="sub-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    className="icons"
                    alt="play icon"
                  />
                  <button
                    className="icons-name"
                    onClick={this.toggleStartPause}
                    type="button"
                  >
                    Start
                  </button>
                </div>
              )}
              {isStarted && (
                <div className="sub-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    className="icons"
                    alt="pause icon"
                  />
                  <button
                    className="icons-name"
                    onClick={this.toggleStartPause}
                    type="button"
                  >
                    Pause
                  </button>
                </div>
              )}

              <div className="sub-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icons"
                  alt="reset icon"
                />
                <button
                  className="icons-name"
                  onClick={this.onReset}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="timer-limit-container">
              <p className="timer-limit-heading">Set Timer limit</p>
              <div className="timer-limit-sub-container">
                <button
                  type="button"
                  className="incrOrDecr-btn"
                  onClick={this.decreaseMin}
                >
                  -
                </button>
                <p className="timer-limit">{minutes}</p>
                <button
                  type="button"
                  className="incrOrDecr-btn"
                  onClick={this.increaseMin}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
