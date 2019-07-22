/*
 * Copyright (c) 2019.  Silviu Stroe
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';
if (window.SpeechRecognition === undefined) {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
}
if (recognition === undefined) {
    var recognition = new window.SpeechRecognition();
}
recognition.interimResults = true;
recognition.maxAlternatives = 5;
recognition.continuous = true;
recognition.lang = config.lang; //passed from background
var finalTranscript = '';
recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
            //document.activeElement.value = interimTranscript;
            // document.execCommand("selectAll", true, null);
            // document.execCommand("insertText", false, interimTranscript || "");
            // console.log("Intermediar " + interimTranscript);
        }

    }
    document.execCommand("selectAll", false, null);
    document.execCommand("insertText", false, finalTranscript || "");
    // console.log("Final " + finalTranscript);
    //document.activeElement.value = finalTranscript;
};


function startRecognition() {
    recognition.start();
}

function stopRecognition() {
    recognition.stop();
}


recognition.onend = function () {
    window.isRecognitionOn = false;
    console.log('Speech recognition service disconnected');

    var event = document.createEvent('Event');
    event.initEvent('recognitionEnded');
    document.dispatchEvent(event);
};


recognition.onstart = function () {
    window.isRecognitionOn = true;
    console.log('Speech recognition service started');

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


if (!window.isRecognitionOn) {
    startRecognition();
} else {
    stopRecognition();
}