var APP = {
  init: function() {
    var bunkerInputs = document.querySelectorAll(".gun-upgrade-input");
    
    bunkerInputs.forEach(function(ele){
      //add oninput
      ele.addEventListener('input', function(){
        APP.updateDOM("bunker settings");
      });
    });
    
    //check settings
    APP.updateDOM("bunker settings");
  },
  updateDOM: function(type) {
    var bunkerUpgrades = {
      //units: document.getElementById("bunker-units-slider").value,
      upgrade1: document.getElementById("bunker-upgrade1-checkbox").checked,
      upgrade2: document.getElementById("bunker-upgrade2-checkbox").checked
    };
    var bunkerTime = document.getElementById("bunker-time");
    var bunkerYieldTime = document.getElementById("bunker-yield-time");
    
    if (type == "bunker settings"){
      if (bunkerUpgrades.upgrade1 == true && bunkerUpgrades.upgrade2 == true){
        BUNKER.timeHr = 2;
        BUNKER.timeMin = 20;
        BUNKER.timeSec = 0;
        BUNKER.timeMs = 0;
        bunkerTime.innerHTML = "02:20:00.000";
        bunkerYieldTime.innerHTML = "2:20:00";
      }
      if (bunkerUpgrades.upgrade1 == false && bunkerUpgrades.upgrade2 == true){
        BUNKER.timeHr = 2;
        BUNKER.timeMin = 0;
        BUNKER.timeSec = 0;
        BUNKER.timeMs = 0;
        bunkerTime.innerHTML = "02:00:00.000";
        bunkerYieldTime.innerHTML = "2:00:00";
      }
      if (bunkerUpgrades.upgrade1 == true && bunkerUpgrades.upgrade2 == false){
        BUNKER.timeHr = 2;
        BUNKER.timeMin = 0;
        BUNKER.timeSec = 0;
        BUNKER.timeMs = 0;
        bunkerTime.innerHTML = "02:00:00.000";
        bunkerYieldTime.innerHTML = "2:00:00";
      }
      if (bunkerUpgrades.upgrade1 == false && bunkerUpgrades.upgrade2 == false){
        BUNKER.timeHr = 1;
        BUNKER.timeMin = 40;
        BUNKER.timeSec = 0;
        BUNKER.timeMs = 0;
        bunkerTime.innerHTML = "01:40:00.000";
        bunkerYieldTime.innerHTML = "1:40:00";
      }
      
      if (BUNKER.state == "new"){      
        document.getElementById("bunker-time").innerHTML = 
        (BUNKER.timeHr /*> 9 ? BUNKER.timeHr : "0" + BUNKER.timeHr*/) + ":" + 
        (BUNKER.timeMin > 9 ? BUNKER.timeMin : "0" + BUNKER.timeMin) + ":" + 
        (BUNKER.timeSec > 9 ? BUNKER.timeSec : "0" + BUNKER.timeSec) + "." + 
        (BUNKER.timeMs > 99 ? BUNKER.timeMs : BUNKER.timeMs > 9 ? "0" + BUNKER.timeMs : "00" + BUNKER.timeMs);
      }
    }
    
    if (type == "car sale count"){
      if (CAR.carCount > 0){
        //display amount of car sales
        var count = document.getElementById("car-count");
        count.style.opacity = "100%";
        count.innerText = CAR.carCount;
      }
    }
  },
  blink: function(type) {
    var stopwatchDigits = document.querySelectorAll(".stopwatch-time-digits");
    var carDigits = document.querySelectorAll("#car-time");
    var bunkerDigits = document.querySelectorAll("#bunker-time");

    if (type == "start stopwatch") {
      //add blink class to text
      stopwatchDigits.forEach(function(ele) {
        ele.classList.add("blink-text");
      });
    }
    if (type == "stop stopwatch") {
      //add blink class to text
      stopwatchDigits.forEach(function(ele) {
        ele.classList.add("blink-text-pause");
      });
    }

    if (type == "car") {
      //add blink class to text
      carDigits.forEach(function(ele) {
        ele.classList.add("blink-text");
      });
    }

    if (type == "bunker") {
      //add blink class to text
      bunkerDigits.forEach(function(ele) {
        ele.classList.add("blink-text");
      });
    }

    setTimeout(function() {
      stopwatchDigits.forEach(function(ele) {
        ele.classList.remove("blink-text");
        ele.classList.remove("blink-text-pause");
      });
      carDigits.forEach(function(ele) {
        ele.classList.remove("blink-text");
      });
      bunkerDigits.forEach(function(ele) {
        ele.classList.remove("blink-text");
      });
    }, 300);
  },
  tallyCount: 0,
  tally: function(type){
    if(type == 1){
      this.tallyCount++;
    } else if (type == 2){
      this.tallyCount = 0;
    }
    
    document.querySelector("#tally-count").innerHTML = this.tallyCount;
  }
};

var CAR8 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn8").innerHTML = "პაუზა";
      APP.blink("car8");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn8").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR8.endTime - timerTime + CAR8.stoppedDuration);
        CAR8.min = timeElapsed.getUTCMinutes();
        CAR8.sec = timeElapsed.getUTCSeconds();
        CAR8.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR8.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR8.reset();
      return;    
    }

    document.getElementById("car-time8").innerHTML = 
        (CAR8.min > 9 ? CAR8.min : "0" + CAR8.min) + ":" + 
        (CAR8.sec > 9 ? CAR8.sec : "0" + CAR8.sec) + "." + 
        (CAR8.ms > 99 ? CAR8.ms : CAR8.ms > 9 ? "0" + CAR8.ms : "00" + CAR8.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time8").innerHTML = "60:00.000";
    document.getElementById("car-start-btn8").innerHTML = "დაწყება";
  }
};

var CAR7 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn7").innerHTML = "პაუზა";
      APP.blink("car7");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn7").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR7.endTime - timerTime + CAR7.stoppedDuration);
        CAR7.min = timeElapsed.getUTCMinutes();
        CAR7.sec = timeElapsed.getUTCSeconds();
        CAR7.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR7.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR7.reset();
      return;    
    }

    document.getElementById("car-time7").innerHTML = 
        (CAR7.min > 9 ? CAR7.min : "0" + CAR7.min) + ":" + 
        (CAR7.sec > 9 ? CAR7.sec : "0" + CAR7.sec) + "." + 
        (CAR7.ms > 99 ? CAR7.ms : CAR7.ms > 9 ? "0" + CAR7.ms : "00" + CAR7.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time7").innerHTML = "60:00.000";
    document.getElementById("car-start-btn7").innerHTML = "დაწყება";
  }
};


var CAR6 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn6").innerHTML = "პაუზა";
      APP.blink("car6");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn6").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR6.endTime - timerTime + CAR6.stoppedDuration);
        CAR6.min = timeElapsed.getUTCMinutes();
        CAR6.sec = timeElapsed.getUTCSeconds();
        CAR6.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR6.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR6.reset();
      return;    
    }

    document.getElementById("car-time6").innerHTML = 
        (CAR6.min > 9 ? CAR6.min : "0" + CAR6.min) + ":" + 
        (CAR6.sec > 9 ? CAR6.sec : "0" + CAR6.sec) + "." + 
        (CAR6.ms > 99 ? CAR6.ms : CAR6.ms > 9 ? "0" + CAR6.ms : "00" + CAR6.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time6").innerHTML = "60:00.000";
    document.getElementById("car-start-btn6").innerHTML = "დაწყება";
  }
};

var CAR5 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn5").innerHTML = "პაუზა";
      APP.blink("car5");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn5").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR5.endTime - timerTime + CAR5.stoppedDuration);
        CAR5.min = timeElapsed.getUTCMinutes();
        CAR5.sec = timeElapsed.getUTCSeconds();
        CAR5.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR5.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR5.reset();
      return;    
    }

    document.getElementById("car-time5").innerHTML = 
        (CAR5.min > 9 ? CAR5.min : "0" + CAR5.min) + ":" + 
        (CAR5.sec > 9 ? CAR5.sec : "0" + CAR5.sec) + "." + 
        (CAR5.ms > 99 ? CAR5.ms : CAR5.ms > 9 ? "0" + CAR5.ms : "00" + CAR5.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time5").innerHTML = "60:00.000";
    document.getElementById("car-start-btn5").innerHTML = "დაწყება";
  }
};


var CAR4 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn4").innerHTML = "პაუზა";
      APP.blink("car4");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn4").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR4.endTime - timerTime + CAR4.stoppedDuration);
        CAR4.min = timeElapsed.getUTCMinutes();
        CAR4.sec = timeElapsed.getUTCSeconds();
        CAR4.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR3.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR3.reset();
      return;    
    }

    document.getElementById("car-time4").innerHTML = 
        (CAR4.min > 9 ? CAR4.min : "0" + CAR4.min) + ":" + 
        (CAR4.sec > 9 ? CAR4.sec : "0" + CAR4.sec) + "." + 
        (CAR4.ms > 99 ? CAR4.ms : CAR4.ms > 9 ? "0" + CAR4.ms : "00" + CAR4.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time4").innerHTML = "60:00.000";
    document.getElementById("car-start-btn4").innerHTML = "დაწყება";
  }
};


var CAR3 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn3").innerHTML = "პაუზა";
      APP.blink("car3");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn3").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR3.endTime - timerTime + CAR3.stoppedDuration);
        CAR3.min = timeElapsed.getUTCMinutes();
        CAR3.sec = timeElapsed.getUTCSeconds();
        CAR3.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR3.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR3.reset();
      return;    
    }

    document.getElementById("car-time3").innerHTML = 
        (CAR3.min > 9 ? CAR3.min : "0" + CAR3.min) + ":" + 
        (CAR3.sec > 9 ? CAR3.sec : "0" + CAR3.sec) + "." + 
        (CAR3.ms > 99 ? CAR3.ms : CAR3.ms > 9 ? "0" + CAR3.ms : "00" + CAR3.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time3").innerHTML = "60:00.000";
    document.getElementById("car-start-btn3").innerHTML = "დაწყება";
  }
};

var CAR1 = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn1").innerHTML = "პაუზა";
      APP.blink("car1");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn1").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR1.endTime - timerTime + CAR1.stoppedDuration);
        CAR1.min = timeElapsed.getUTCMinutes();
        CAR1.sec = timeElapsed.getUTCSeconds();
        CAR1.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR1.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR1.reset();
      return;    
    }

    document.getElementById("car-time1").innerHTML = 
        (CAR1.min > 9 ? CAR1.min : "0" + CAR1.min) + ":" + 
        (CAR1.sec > 9 ? CAR1.sec : "0" + CAR1.sec) + "." + 
        (CAR1.ms > 99 ? CAR1.ms : CAR1.ms > 9 ? "0" + CAR1.ms : "00" + CAR1.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time1").innerHTML = "60:00.000";
    document.getElementById("car-start-btn1").innerHTML = "დაწყება";
  }
};

var CAR = {
  min: 0,
  sec: 0,
  ms: 0,
  carCount: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setMinutes( this.endTime.getMinutes() + 60);
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("car-start-btn").innerHTML = "პაუზა";
      APP.blink("car");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("car-start-btn").innerHTML = "განაგრძე";
    APP.blink("stop car");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(CAR.endTime - timerTime + CAR.stoppedDuration);
        CAR.min = timeElapsed.getUTCMinutes();
        CAR.sec = timeElapsed.getUTCSeconds();
        CAR.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      CAR.carCount++;
      APP.updateDOM("car sale count");
      clearInterval(this.started);
      CAR.reset();
      return;    
    }

    document.getElementById("car-time").innerHTML = 
        (CAR.min > 9 ? CAR.min : "0" + CAR.min) + ":" + 
        (CAR.sec > 9 ? CAR.sec : "0" + CAR.sec) + "." + 
        (CAR.ms > 99 ? CAR.ms : CAR.ms > 9 ? "0" + CAR.ms : "00" + CAR.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    document.getElementById("car-time").innerHTML = "60:00.000";
    document.getElementById("car-start-btn").innerHTML = "დაწყება";
  }
};

var BUNKER = {
  hr: 0,
  min: 0,
  sec: 0,
  ms: 0,
  timeHr: 2,
  timeMin: 20,
  timeSec: 0,
  timeMs: 0,
  endTime: null,
  timeStopped: null,
  stoppedDuration: null,
  started: null,
  state: "new",
  start: function(){
    if (this.state == "started"){
      this.stop();
    } else {
      if (this.endTime === null) {
        this.endTime = new Date();
        this.endTime.setHours( this.endTime.getHours() + this.timeHr );
        this.endTime.setMinutes( this.endTime.getMinutes() + this.timeMin );
      }
      
      if (this.timeStopped !== null) {
          this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.state = "started";
      document.getElementById("bunker-start-btn").innerHTML = "Stop";
      APP.blink("bunker");    
    }
  },
  stop: function(){
    this.timeStopped = new Date();
    this.state = "stopped";
    document.getElementById("bunker-start-btn").innerHTML = "Start";
    APP.blink("stop bunker");
    clearInterval(this.started);
  },
  clockRunning: function(){
    var timerTime = new Date()
        , timeElapsed = new Date(BUNKER.endTime - timerTime + BUNKER.stoppedDuration);
        BUNKER.hr = timeElapsed.getUTCHours();
        BUNKER.min = timeElapsed.getUTCMinutes();
        BUNKER.sec = timeElapsed.getUTCSeconds();
        BUNKER.ms = timeElapsed.getUTCMilliseconds();
    
    if (timeElapsed.getTime() < 0){ 
      clearInterval(this.started);
      BUNKER.reset();
      return;    
    }

    document.getElementById("bunker-time").innerHTML = 
      (BUNKER.hr/* > 9 ? BUNKER.hr : "0" + BUNKER.hr*/) + ":" + 
      (BUNKER.min > 9 ? BUNKER.min : "0" + BUNKER.min) + ":" + 
      (BUNKER.sec > 9 ? BUNKER.sec : "0" + BUNKER.sec) + "." + 
      (BUNKER.ms > 99 ? BUNKER.ms : BUNKER.ms > 9 ? "0" + BUNKER.ms : "00" + BUNKER.ms);
  },
  reset: function() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.endTime = null;
    this.timeStopped = null;
    this.state = "new";
    APP.updateDOM("bunker settings");
    document.getElementById("bunker-start-btn").innerHTML = "Start";
  }
};

var SAVE = {
  /*setCookie: function(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  getCookie function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  checkCookie: function() {
    var user=this.getCookie("username");
    
    if (user != "") {
      console.log("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        this.setCookie("username", user, 30);
      }

    }
  }*/
};

APP.init();