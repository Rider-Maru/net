var soundArrayCommon = [];
var soundArrayKey = [];
var bufferListUpCommon = [];
var bufferListUpKey = [];
var nowplay;
var nowplaynumKey;
var nowplaynumCommon;
var onRingingStandby = false;

var shiningAssaultHopperNum = 7;
var metalClasterHopperNum = 8;
var onRingingStandbyLetRise = false;


    function BufferLoader(context, urlList, callback) {
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }
    BufferLoader.prototype.loadBuffer = function (url, index) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        var loader = this;
        request.onload = function () {
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);
                },
                function (error) {
                    console.error('decodeAudioData error', error);
                }
            );
        }
        request.onerror = function () {
            alert('BufferLoader: XHR error');
        }
        request.send();
    }
    BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
    }
window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
//-------------------------------------------    
'use strict';

var context, analyser, frequencies, getByteFrequencyDataAverage,  draw;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

analyser = context.createAnalyser();
frequencies = new Uint8Array(analyser.frequencyBinCount);

getByteFrequencyDataAverage = function () {
    analyser.getByteFrequencyData(frequencies);
    return frequencies.reduce(function (previous, current) {
        return previous + current;
    }) / analyser.frequencyBinCount;
};

// 透明度を変更する要素
var lightLayer = document.getElementsByClassName('square-button');
// 可能な限り高いフレームレートで音量を取得し、透明度に反映する
(draw = function () {
    
    // opacityの範囲である0〜1に変換
    var val = (getByteFrequencyDataAverage() / 255) * (getByteFrequencyDataAverage() / 255) * 7;
    for (var i = 0; i < lightLayer.length; i++){
        lightLayer[i].style.opacity = val;
    }
    document.getElementById("debug_gain").textContent = val;
    requestAnimationFrame(draw);
})();
//-------------------------------------------

//context = new AudioContext();
    bufferLoader = new BufferLoader(
        context,
        [
            'audio/authorize.mp3',
            'audio/standbyLoop.mp3',
            'audio/finish.mp3',
            'audio/impact.mp3',
            'audio/explosion.mp3',
            'audio/overrize.mp3',
            'audio/finishAssault.mp3',
            'audio/progrise.mp3',
            'audio/LetsRise.mp3'

        ],
        finishedLoading
    );
    bufferLoader.load();
function finishedLoading(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
        var source = context.createBufferSource();
        source.buffer = bufferList[i];
        bufferListUpCommon[i] = bufferList[i];
        source.connect(context.destination);
        soundArrayCommon.push(source);
    }
        bufferLoader = new BufferLoader(
            context,
            [
                'audio/jump.mp3',
                'audio/risingHopper.mp3',
                'audio/rising.mp3',
                'audio/wing.mp3',
                'audio/flyingFalcon.mp3',
                'audio/flying.mp3',
                'audio/fang.mp3',
                'audio/bitingShark.mp3',
                'audio/biting.mp3',
                'audio/fire.mp3',
                'audio/flamingTiger.mp3',
                'audio/flaming.mp3',
                'audio/Blizzard.mp3',
                'audio/freezingBear.mp3',
                'audio/freezing.mp3',
                'audio/press.mp3',
                'audio/breakingMommoth.mp3',
                'audio/breaking.mp3',
                'audio/shiningJump.mp3',
                'audio/shiningHopper.mp3',
                'audio/shining.mp3',
                'audio/hyperJump.mp3',
                'audio/shiningAssaultHopper.mp3',
                'audio/shiningStorm.mp3',
                'audio/everybodyJump.mp3',
                'audio/metalClasterHopper.mp3',
                'audio/metalRising.mp3',
                /*
                'audio/.mp3',
                'audio/.mp3',
                'audio/.mp3',
                */
            ],
            finishedLoading
        );
        bufferLoader.load();
        function finishedLoading(bufferList) {
            alert("ロードが完了しました");
            finishAudioLoading();
            for (var i = 0; i < bufferList.length; i++) {
                var source = context.createBufferSource();
                source.buffer = bufferList[i];
                bufferListUpKey[i] = bufferList[i];
                source.connect(context.destination);
                soundArrayKey.push(source);
            }
        }
}

function playSECallKey(callNum) {
    if (soundArrayKey[0]== null) {
        alert('オーディオデータをロード中です');
        return;
    }
    console.log("Key" + num);
    var num = callNum * 3;

    soundArrayKey[num].connect(analyser);
    soundArrayKey[num].start(0);
    soundArrayKey[num] = context.createBufferSource();
    soundArrayKey[num].buffer = bufferListUpKey[num];
    soundArrayKey[num].connect(context.destination); 
}

function playSECallFunction(callNum) {
    var num = 1 + callNum * 3;
    nowplaynumKey = num;
    console.log("Function" + num);
    soundArrayKey[nowplaynumKey].connect(analyser);
    soundArrayKey[nowplaynumKey].start(0);
}

function playSECallFinish(callNum) {
    var num = 2 + callNum * 3;
    stopSE();
    nowplaynumCommon = 2;
    if (callNum == shiningAssaultHopperNum) nowplaynumCommon = 6;
    console.log("Finish" + num);
    soundArrayCommon[nowplaynumCommon].connect(analyser);
    soundArrayCommon[nowplaynumCommon].start(0);
    soundArrayCommon[nowplaynumCommon].onended = function () {
        if (nowplaynumCommon == null) return;
        stopSE();
        nowplaynumCommon = null;
        nowplaynumKey = num;
        soundArrayKey[num].connect(analyser);
        soundArrayKey[num].start(0);
        soundArrayKey[num].onended = function () {
            if (nowplaynumKey == null) return;
            stopSE();
            nowplaynumCommon = 3;
            nowplaynumKey = null;
            soundArrayCommon[3].connect(analyser);
            soundArrayCommon[3].start(0);
        }
    }
}

function playSEBelt(callNum) {
    var num = 0;
    if (callNum == shiningAssaultHopperNum) num = 5;

    nowplaynumCommon = num;
    console.log("Belt"+num);
    soundArrayCommon[num].connect(analyser);
    soundArrayCommon[num].start(0);
    soundArrayCommon[num].onended = function () {
        if (nowplaynumCommon == null) return;
        if (onStandByMetal) return;
            soundArrayCommon[1].loop = true;
            soundArrayCommon[1].start(0);
            onRingingStandby = true;
    }
}

function playSELetsRise() {
    var num = 7;
    nowplaynumCommon = num;
    console.log("Belt" + num);
    soundArrayCommon[num].connect(analyser);
    soundArrayCommon[num].start(0);
    soundArrayCommon[num].onended = function () {
        console.log(onStandByMetal);
        if (nowplaynumCommon == null) return;
        if (!onStandByMetal) return;
        soundArrayCommon[8].loop = true;
        soundArrayCommon[8].start(0);
        onRingingStandbyLetRise = true;
    }
}


function stopSE() {
    if (nowplaynumCommon != null){
        soundArrayCommon[nowplaynumCommon].stop();
        soundArrayCommon[nowplaynumCommon] = context.createBufferSource();
        soundArrayCommon[nowplaynumCommon].buffer = bufferListUpCommon[nowplaynumCommon];
        soundArrayCommon[nowplaynumCommon].connect(context.destination);
        nowplaynumCommon =null
    }
    if (nowplaynumKey != null) {
        soundArrayKey[nowplaynumKey].stop();
        soundArrayKey[nowplaynumKey] = context.createBufferSource();
        soundArrayKey[nowplaynumKey].buffer = bufferListUpKey[nowplaynumKey];
        soundArrayKey[nowplaynumKey].connect(context.destination);
        nowplaynumKey = null;
    }
}

function stopStandbySE() {
    if (!onRingingStandby) return;
    soundArrayCommon[1].stop();
    soundArrayCommon[1] = context.createBufferSource();
    soundArrayCommon[1].buffer = bufferListUpCommon[1];
    soundArrayCommon[1].connect(context.destination);
    onRingingStandby = false;
}
function stopStandbyLetsRise() {
    if (!onRingingStandbyLetRise) return;
    soundArrayCommon[8].stop();
    soundArrayCommon[8] = context.createBufferSource();
    soundArrayCommon[8].buffer = bufferListUpCommon[8];
    soundArrayCommon[8].connect(context.destination);
    onRingingStandbyLetRise = false;
}