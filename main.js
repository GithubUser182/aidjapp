scoreLeftWrist=0
song1=""
song2=""
song1_status=""
song2_status=""

function preload(){
    song1=loadSound("Dog.mp3")
    song2=loadSound("Haggstrom.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("PoseNet Initialized!")
}

function draw(){
    image(video, 0, 0, 600, 500)

    fill('#eb4034')
    stroke('#eb4034')

    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20)
        song2.stop()
        }

        if(song1_status=="false"){
            document.getElementById("songplaying").innerHTML="Song currently playing is Dog by C418"
        }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("leftWristX = "+leftWristX+" | leftWristY = "+leftWristY)

        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY)
    }
}