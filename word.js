class words {
    constructor(word, wordx, wordy, wordxspeed, wordyspeed) {
        this.word = word
        this.wordx = wordx
        this.wordy = wordy
        this.wordxspeed = wordxspeed
        this.wordyspeed = wordyspeed
    }

    show() {
        fill(255)
        textSize(40)
        text(this.word, this.wordx, this.wordy)
    }

//I want the word move around to make it more dynamic, and the score will help dictate
//the speed of the word as it bounces around the screen. 
    move() {
        this.wordx += this.wordxspeed;
		this.wordy += this.wordyspeed;
	
		if (this.wordx < 0 || this.wordx > 500) {
			this.wordxspeed *= -1;
		}
		if (this.wordy < 0 || this.wordy > height) {
			this.wordyspeed *= -1;
		}
    }
}