window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var finalTranscript = '';
var recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 5;
recognition.continuous = true;
recognition.lang = config.lang;
recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
            document.activeElement.value = interimTranscript;
        }
    }
    document.activeElement.value = finalTranscript;
};


function startRecognition() {
    // if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
    recognition.start();
    // }
}

function stopRecognition() {
    recognition.stop();
    localStorage.setItem("isRecognitionRunning", "no");
}


recognition.onend = function () {
    localStorage.setItem("isRecognitionRunning", "no");
    console.log('Speech recognition service disconnected');

    var event = document.createEvent('Event');
    event.initEvent('recognitionEnded');
    document.dispatchEvent(event);
};

recognition.onstart = function () {
    console.log('Speech recognition service started');
    localStorage.setItem("isRecognitionRunning", "yes");

    var event = document.createEvent('Event');
    event.initEvent('recognitionStarted');
    document.dispatchEvent(event);
};

navigator.permissions.query(
    {name: 'microphone'}
).then(function (permissionStatus) {
    if (permissionStatus.state === "denied") {
        alert("Please allow microphone permission to use VoiceFiller SpeechToText on this site");
    }
    permissionStatus.onchange = function () {
        if (this.state === "denied") {
            alert("You cannot use VoiceFiller SpeechToText extension until allow microphone permission");
        }
        console.log("Permission changed to " + this.state);
    }
});


if (localStorage.getItem("isRecognitionRunning") !== "yes") {
    startRecognition();
} else {
    stopRecognition();
}

