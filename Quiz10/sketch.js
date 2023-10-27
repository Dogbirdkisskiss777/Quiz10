let song;

function preload() {
  // Fill in the url for your audio asset
  song = loadSound("sample-visualisation.mp3");
}

function setup() {
  cnv = createCanvas(400, 400);
  // Create a new FFT analysis object
  fft = new p5.FFT();
  // Add the song (sample) into the FFT's input
  song.connect(fft);
}

function draw() {
  // Give the user a hint on how to interact with the sketch
  if (getAudioContext().state !== 'running') {
    background(220);
    text('tap here to play some sound!', 10, 20, width - 20);
    // Early exit of the draw loop
    return;
  }

  background(0);
  stroke(0, 255, 0);

  // Request fresh data from the FFT analysis
  let spectrum = fft.analyze();
  fill(251, 96, 127);

  //draw the spectrum using a log scale to show energy per octave
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(log(i), 0, log(spectrum.length), 0, width);
    let y = map(log(i), 0, log(spectrum.length), 0, width);
    let r = map(spectrum[i], 0, 255, 0, height);

    circle(x, y, r);
  }


}

// Toggle playback on or off with a mouse click
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}


