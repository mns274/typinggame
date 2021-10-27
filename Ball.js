//The balls will provide a distraction for the player, adding difficulty to the game
//I took a lot of inspiration from the ball exercises we had in class, but figured 
//how to manipulate the ball speed with an outside variable, the score, to make them
//faster as the player did better. 

class Ball {
    constructor(ballXspeed, ballYspeed) {
        this.ballX = random(500)
        this.ballY = random(height)
        this.ballXspeed = ballXspeed
        this.ballYspeed = ballYspeed
        this.ballhue = 255
    }

    move() {

        this.ballX += this.ballXspeed
        this.ballY += this.ballYspeed

        if (this.ballX < 0 || this.ballX > 500) {
			this.ballXspeed *= -1;
		}
		if (this.ballY < 0 || this.ballY > height) {
			this.ballYspeed *= -1;
		}
    }
    
    show() {
        noStroke();
        fill(this.ballhue);
        ellipse(this.ballX, this.ballY, 50, 50);
    }

    //Tried to add a tactile pop for when a ball hit the wall but ended up not working!
    // sound() {
    //     if (this.ballX = 0) {
    //         popsound.play()
    //     }
    //     if (this.ballY = 0) {
    //         popsound.play()
    //     }
    // }

}