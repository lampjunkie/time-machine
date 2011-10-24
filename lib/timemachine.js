/**
 * Define the TimeMachine constructor
 */
var TimeMachine  = function () {
  this.DEFAULT = 'DEFAULT';
  this.timeouts = {};
  this.intervals = {};
};

/**
 * Create a new timeout and store it in the current queue
 * 
 * @param {String}    group
 * @param {String}    name
 * @param {Function}  callback
 * @param {Number}    milliseconds
 * @returns timeout
 */
TimeMachine.prototype.runTimeout = function(group, name, callback, milliseconds){
  var that = this;
  var timeout = setTimeout(function(){
    callback();
    that.stopTimeout(group, name);
  }, milliseconds);

  if(this.timeouts[group] == undefined){
    this.timeouts[group] = {};
  }

  this.timeouts[group][name] = timeout;  
  return timeout;
};

/**
 * Stop/remove a previously created timeout
 *
 * @param {String}    group
 * @param {String}    name
 * @returns void
 */
TimeMachine.prototype.stopTimeout = function(group, name){
  if(this.timeouts[group] != undefined){
    var timeout = this.timeouts[group][name];
    clearTimeout(timeout);
    delete this.timeouts[group][name];
  }
};

/**
 * Stop all timeouts within a group
 *
 * @param {String}    group
 * @returns void
 */
TimeMachine.prototype.stopTimeoutsInGroup = function(group){
  if(this.timeouts[group] != undefined){
    for(var i in this.timeouts[group]){
      if(this.timeouts[group][i] != null){
        this.stopTimeout(group, i);
      }
    }
  }
};

/**
 * Stop all the currently queued timeouts
 *
 * @returns void
 */
TimeMachine.prototype.stopTimeouts = function(){
  for(var i in this.timeouts){
    this.stopTimeoutsInGroup(i);
  }
};

/**
 * Create a new interval and store it in the current queue
 * 
 * @param {String}    group
 * @param {String}    name
 * @param {Function}  callback
 * @param {Number}    milliseconds
 * @returns interval
 */
TimeMachine.prototype.runInterval = function(group, name, callback, milliseconds){
  var interval = setInterval(callback, milliseconds);

  if(this.intervals[group] == undefined){
    this.intervals[group] = {};
  }

  this.intervals[group][name] = interval;  
  return interval;
};

/**
 * Stop/remove a previously created interval
 *
 * @param {String}    group
 * @param {String}    name
 * @returns void
 */
TimeMachine.prototype.stopInterval = function(group, name){
  if(this.intervals[group] != undefined){
    var interval = this.intervals[group][name];
    clearInterval(interval);
    delete this.intervals[group][name];
  }
};

/**
 * Stop all intervals within a group
 *
 * @param {String}    group
 * @returns void
 */
TimeMachine.prototype.stopIntervalsInGroup = function(group){
  if(this.intervals[group] != undefined){
    for(var i in this.intervals[group]){
      if(this.intervals[group][i] != null){
        this.stopInterval(group, i);
      }
    }
  }
};

/**
 * Stop all the currently queued intervals
 *
 * @returns void
 */
TimeMachine.prototype.stopIntervals = function(){
  for(var i in this.intervals){
    this.stopIntervalsInGroup(i);
  }
};

/**
 * Stop all timeouts and intervals
 *
 * @returns void
 */
TimeMachine.prototype.stop = function(){
  this.stopTimeouts();
  this.stopIntervals();
};

// export TimeMachine
module.exports = exports = TimeMachine;
