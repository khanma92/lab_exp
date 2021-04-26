// DEFINE TASK (required)
var taskinfo = {
    type: 'survey', // 'task', 'survey', or 'study'
    uniquestudyid: 'brs1', // unique task id: must be IDENTICAL to directory name
    desc: 'Pennycook 2015 bullshit reception detection study 1', // brief description of task
    condition: null, // experiment/task condition
    redirect_url: "/surveys/brs1/viz" // set to false if no redirection required
};
var info_ = create_info_(taskinfo);  // initialize subject id and task parameters
if (info_.subject && info_.time) {
    taskinfo.redirect_url = taskinfo.redirect_url + '?id=' + info_.subject + '&time=' + info_.time;
}
const debug = false;  // true to print messages to console and display json results
var font_colour = "black";
var background_colour = "white";
set_colour(font_colour, background_colour);

// DEFINE TASK PARAMETERS (required)
var slider_width = 500; // width of slider in pixels
var scale_min_max = [1, 5]; // slider min max values
var scale_starting_points = [2, 3, 4]; // starting point of scale; if length > 1, randomly pick one for each scale item
var scale_labels = ['not at all profound', 'very profound'];
var step = 0.01; // step size of scale
var require_movement = false; // whether subject must move slider before continuig
var shuffle_items = true; // randomize order of item presentation

jsPsych.data.addProperties({ // do not edit this section unnecessarily!
    subject: info_.subject,
    type: taskinfo.type,
    uniquestudyid: taskinfo.uniquestudyid,
    desc: taskinfo.desc,
    condition: taskinfo.condition,
});

// create experiment objects and timeline
var instructions = {
    type: "instructions",
    pages: [
        generate_html("Welcome!", font_colour, 25, [0, 0]) +
        generate_html("We are interested in how people experience the profound.", font_colour) +
        generate_html("Below are a series of statements taken from relevant websites. ", font_colour) +
        generate_html("Please read each statement and take a moment to think about what it might mean.", font_colour) +
        generate_html("Then please rate how <strong>profound</strong> you think it is.", font_colour) +
        generate_html("Profound means 'of deep meaning, of great and broadly inclusive significance.'", font_colour),
    ],
    show_clickable_nav: true,
    show_page_number: false,
};

var start_point;  // to specify scale starting point on each trial
var procedure = {
    timeline: [{
        type: 'html-slider-response',
        stimulus: function () {
            return generate_html(jsPsych.timelineVariable('desc', true), font_colour);
        },
        data: {
            q: jsPsych.timelineVariable('q'),
            subscale: jsPsych.timelineVariable('subscale'),
            reverse: jsPsych.timelineVariable('reverse')
        },
        labels: scale_labels,
        slider_width: slider_width,
        min: scale_min_max[0],
        max: scale_min_max[1],
        start: function () {
            start_point = jsPsych.randomization.sampleWithoutReplacement(scale_starting_points, 1)[0];
            return start_point;
        },
        step: step,
        require_movement: require_movement,
        on_finish: function (data) {
            data.start_point = start_point;
            data.resp = Number(data.response);
            data.resp_reverse = data.resp;
            if (data.reverse) { // reverse code item if necessary
                data.resp_reverse = scale_min_max[1] + 1 - data.resp;
            }
            if (debug) {
                console.log("q" + data.q + " (reverse: " + data.reverse + "): " + data.stimulus);
                console.log("resp: " + data.resp + ", resp_reverse: " + data.resp_reverse);
            }
        }
    }],
    timeline_variables: items, // items come from environment variable in items.js
    randomize_order: shuffle_items
};


















// create timeline and events/objects for study (the first next lines are always the same! consent then check whether it's same person)
var timeline = [];
timeline = create_consent(timeline, taskinfo);
timeline = check_same_different_person(timeline);

timeline.push(instructions);
timeline.push(procedure);
timeline = create_demographics(timeline);

// run task
jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        document.body.style.backgroundColor = 'white';
        var datasummary = summarize_data();

        jsPsych.data.get().addToAll({
            total_time: jsPsych.totalTime() / 60000,
        });
        jsPsych.data.get().first(1).addToAll({
            info_: info_,
            datasummary: datasummary,
        });
        if (debug) {
            jsPsych.data.displayData();
        }

        info_.tasks_completed.push(taskinfo.uniquestudyid); // add uniquestudyid to info_
        info_.current_task_completed = 1;
        localStorage.setObj('info_', info_);
        submit_data(jsPsych.data.get().json(), taskinfo.redirect_url);
    }
});



















// functions to summarize data below
function preprocess_data() {
    var data_sub = jsPsych.data.get().filter({ "trial_type": "html-slider-response" });
    var data_sub = data_sub.filterCustom(function (trial) { return trial.q > 0 });
    var data_sub = data_sub.filterCustom(function (trial) { return trial.rt > 200 });
    return data_sub;
}

function summarize_data() {
    var d = preprocess_data(); // get preprocess/clean data

    // mean resp
    var brs_resp = d.select('resp_reverse').mean();

    // store above info in array
    var datasummary = [
        { type: "all", param: "resp", value: brs_resp },
    ];

    // add id/country information
    datasummary.forEach(function (s) {
        s.subject = info_.subject;
        s.country = info_.demographics.country;
        s.country_code = info_.demographics.country_code;
        s.gender = info_.demographics.gender;
        s.age = info_.demographics.age;
        s.religion = info_.demographics.religion;
        s.total_time = jsPsych.totalTime() / 60000;
        s.time = info_.time;

        if (s.age <= 14) {
            s.age_group = "Children (0-14 yrs)"
        } else if (s.age <= 24) {
            s.age_group = "Youth (15-24 yrs)"
        } else if (s.age <= 64) {
            s.age_group = "Adults (25-64 yrs)"
        } else if (s.age > 64) {
            s.age_group = "Seniors (>64 yrs)"
        } else {
            s.age_group = null
        }

    })
    console.log(datasummary);
    return datasummary
}