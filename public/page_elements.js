var surveys = [
    { uniquestudyid: 'gritshort', name: 'Grit short', description: 'How open, conscientious, extraverted, agreeable, and neurotic are you?', time: '3-5 minutes' },
    { uniquestudyid: 'bigfiveaspect', name: 'Big five aspects', description: 'Just some text here', time: '3-5 minutes' },
    { uniquestudyid: 'gritshort', name: 'Grit short', description: 'How open, conscientious, extraverted, agreeable, and neurotic are you?', time: '3-5 minutes' },
    { uniquestudyid: 'bigfiveaspect', name: 'Big five aspects', description: 'Description...', time: '3-5 minutes' },
];

var tasks = [
    { uniquestudyid: 'delaydiscount', name: 'Delay discount', description: 'Choose your preferred reward.', time: '3-5 minutes' },
    { uniquestudyid: 'stroop', name: 'Stroop', description: 'Respond to prompted texts with their colours.', time: '3-5 minutes' },
    { uniquestudyid: 'symbolcount', name: 'Symbol counting', description: 'Description...', time: '3-5 minutes' },
    { uniquestudyid: 'stroop', name: 'Stroop', description: 'Respond to prompted texts with their colours.', time: '3-5 minutes' },
    { uniquestudyid: 'symbolcount', name: 'Symbol counting', description: 'Description...', time: '3-5 minutes' },
    { uniquestudyid: 'updatemath', name: 'Mental math', description: 'Description...', time: '3-5 minutes' }
];

var studies = [
    { uniquestudyid: 'studyA', name: 'Study A', description: 'Description', time: '3-5 minutes' }
];

var tasks_to_try = [
    { route: '/tasks/delaydiscount', uniquestudyid: 'delaydiscount', time: '3-5 mins' },
    { route: '/surveys/gritshort', uniquestudyid: 'gritshort', time: '1-3 mins' },
    { route: '/tasks/stroop', uniquestudyid: 'stroop', time: '5-8 mins' },
];

module.exports = { surveys, tasks, studies, tasks_to_try };