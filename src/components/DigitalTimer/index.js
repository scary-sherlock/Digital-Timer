import React, { Component } from 'react';
import './index.css';

class DigitalTimer extends Component {
    state = {
        isRunning: false,
        timeRemaining: 25 * 60,
        timerLimit: 25,
    };

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    startOrPauseTimer = () => {
        const { isRunning } = this.state;
        if (isRunning) {
            clearInterval(this.intervalId);
        } else {
            this.intervalId = setInterval(this.decrementTime, 1000);
        }
        this.setState(prevState => ({ isRunning: !prevState.isRunning }));
    };

    decrementTime = () => {
        this.setState(prevState => {
            if (prevState.timeRemaining === 0) {
                clearInterval(this.intervalId);
                return { isRunning: false };
            }
            return { timeRemaining: prevState.timeRemaining - 1 };
        });
    };

    resetTimer = () => {
        clearInterval(this.intervalId);
        this.setState({
            isRunning: false,
            timeRemaining: this.state.timerLimit * 60,
        });
    };

    incrementTimerLimit = () => {
        this.setState(prevState => ({
            timerLimit: prevState.timerLimit + 1,
            timeRemaining: (prevState.timerLimit + 1) * 60,
        }));
    };

    decrementTimerLimit = () => {
        this.setState(prevState => ({
            timerLimit: Math.max(prevState.timerLimit - 1, 0),
            timeRemaining: Math.max(prevState.timerLimit - 1, 0) * 60,
        }));
    };

    render() {
        const { isRunning, timeRemaining, timerLimit } = this.state;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const displayTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
            }`;

        return (
            <div className="digital-timer">
                <h1>Digital Timer</h1>
                <div className="timer-container">
                    <div className="timer-display">
                        <div className="timer">
                            <h1 className="time">{displayTime}</h1>
                            <p className="status">{isRunning ? 'Running' : 'Paused'}</p>
                        </div>
                    </div>
                    <div className="all-controls">

                        <div className="controls">
                            <button
                                type="button"
                                className="control-button"
                                onClick={this.startOrPauseTimer}
                            >
                                <img
                                    src={
                                        isRunning
                                            ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                                            : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                                    }
                                    alt={isRunning ? 'pause icon' : 'play icon'}
                                    className="control-icon"
                                />
                                {isRunning ? 'Pause' : 'Start'}
                            </button>
                            <button
                                type="button"
                                className="control-button"
                                onClick={this.resetTimer}
                            >
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                                    alt="reset icon"
                                    className="control-icon"
                                />
                                Reset
                            </button>
                        </div>
                        <h2>Set Timer Limit</h2>
                        <div className="timer-limit-controls">
                            <button
                                type="button"
                                className="timer-limit-button"
                                onClick={this.decrementTimerLimit}
                                disabled={isRunning || timerLimit === 0}
                            >
                                -
                            </button>
                            <div className="timer-limit-value">{timerLimit}</div>
                            <button
                                type="button"
                                className="timer-limit-button"
                                onClick={this.incrementTimerLimit}
                                disabled={isRunning}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DigitalTimer;