    //Display the current time
    var time = setInterval(showTime, 1000);

   /**
    * Function to set the time. Sets the clock <p> in html to show time
    */
    function showTime() {
        var date = new Date();
        var time = date.toLocaleTimeString();
        document.getElementById("clock").innerHTML = time;
        return time;
    }

    /**
     * Function to set the options for select tags
     * @param {string} input_name - id value of the <select> tag whose inputs we want to set
     * @param {int} max_value  - max value of the input
     */
    function setTimeInputs(input_name, max_value) {
        var time_input = document.getElementById(input_name);

        for (i = 1; i <= max_value; i++) {
            time_input.options[time_input.options.length] = new Option( i < 10 ? "0" + i : i, i);
        }
    }

    function setTimer() {
        var current_time = showTime();
        
    }

    function get_time_difference(current_time, set_time) {
        
    }

    setTimeInputs("alarm_hrs", 12);
    setTimeInputs("alarm_min", 59);
