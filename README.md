# time-machine

time-machine is a nodejs module which abstracts the creation and destruction of timeouts and intervals.

## Installation

    $ npm install time-machine

## Usage

```javascript
var TimeMachine = require('time-machine');
var tm = new TimeMachine();

// create a timeout in the default group with the name 'test-timeout'
tm.runTimeout(TimeMachine.DEFAULT, 'test-timeout', function(){ 
  console.log('running timeout');
}, 5000);

// create a interval in the default group with the name 'test-interval'
tm.runInterval(TimeMachine.DEFAULT, 'test-interval', function(){
  console.log('running interval');
}, 1000);

// action which get's called from somewhere to stop all timeouts and intervals
function stop(){

  // stop a single timeout
  tm.stopTimeout(TimeMachine.DEFAULT, 'test-timeout');

  // stop all timeouts in a group
  tm.stopTimeoutsInGroup(TimeMachine.DEFAULT);

  // stop all timeouts in all groups
  tm.stopTimeouts();

  // stop a single interval
  tm.stopInterval(TimeMachine.DEFAULT, 'test-interval');

  // stop all intervals in a group
  tm.stopIntervalsInGroup(TimeMachine.DEFAULT);

  // stop all intervals in all groups
  tm.stopIntervals();

};
```
