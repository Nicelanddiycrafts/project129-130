song1 = "";
song2 = "";
songstat1 = "";
songstat2 = "";
lwx = 0;
lwy = 0;
rwy = 0;
rwx = 0;
stat = "";
scorelw = 0;
scorerw = 0;


function preload() {
    song1 = loadSound("encanto1.mp3");
    song2 = loadSound("encanto2.mp3");
    ib = loadImage('ib.png');
    lisa = loadImage('lisa.png');
}

function setup() {
    canvas = createCanvas(450, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    song1.play();
    document.getElementById('sv').innerHTML = "Song: What Else Can I Do?,Song by Diane Guerrero and Stephanie Beatriz"

}


function draw() {
    image(video, 0, 0, 450, 300);
    songstat1 = song1.isPlaying();
    songstat2 = song2.isPlaying();


    if (scorerw > 0.2) {
        image(ib, rwx, rwy, 50, 100);
        song2.stop();
        if (songstat1 == false) {
song1.play();
document.getElementById('sv').innerHTML = "Song: What Else Can I Do?,Song by Diane Guerrero and Stephanie Beatriz"
        }
    }

    if (scorelw > 0.2) {
        image(lisa, lwx, lwy, 50, 100);
        song1.stop();
        if( songstat2 == false){
            song2.play();
            document.getElementById('sv').innerHTML = "Song: Surface Pressure, Song by Jessica Darrow";
        }

    }

}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        scorelw = results[0].pose.keypoints[9].score;
        scorerw = results[0].pose.keypoints[10].score;

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;

    }
}