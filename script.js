//Thanks to the p5.js Sound Library, Gregor Aisch's chroma and Daniel Howe's RiTa lirbaries to make
//this project possible. 

//Music: "Kitchentable" by 505, found at
//https://freemusicarchive.org/music/505/Relix_1996-2013/17_505_-_kitchentable#
//Sound Effects: 
//"Coins 1" by ProjectsU012
//https://freesound.org/people/ProjectsU012/sounds/341695/
//"Gave Over Arcade" by myfox14
//https://freesound.org/people/myfox14/sounds/382310/


//I'm going to play with the BG color probably using chroma to go from green to red

let typeword = [];
let bounceword = [];
let balls = []
//Tie the game score to the speed of the moving objects
let score = 0;
let ballpos = 0
let typefinal;
let table;
let coin;
let popsound;
let over
let rectcolor = chroma('hotpink').rgb()

let timercolor = chroma.scale(["chartreuse", "crimson"])
console.log(timercolor)

//Great learning about RiTa to help find an easy source of random words
//could not find an API that fit my specifications
let matchword =  RiTa.randomWord({maxLength: score + 4})


function setup() {
	createCanvas(800, 600);
	textAlign(CENTER, CENTER)

	//By pushing a word into the array, I have better control over
	//removing it with splice later on.
	//I'm trying to increase the speed of the word with an increased score
	bounceword.push(new words(matchword, random(500), random(height), score+1, score+1))

	//used Coding Train and p5.js reference to get sounds working
	table = loadSound("kitchentable.mp3", loaded)
	coin = loadSound("coin.wav")
	over = loadSound("gameover.wav")

}

function loaded() {
	table.loop()
}

function draw() {
	background(0); 

	//I used the P5JS reference at https://p5js.org/reference/#/p5/join
	//to help figure out how to create a single string for the word
	let separator = ''
	let typefinal = join(typeword, separator)


	noStroke()
	fill(rectcolor)
	rect(0, 0, 525, height)
	fill(255)
	rect(525, 0, 75, height)

	//test to show typefinal is working
	// fill(255)
	// textSize(40)
	// text(typefinal, 300, (height/3))

	//Many things need to happen to keep this game running when the word is typed correctly. 
	//I used RiTa's randomWord() feature to allow for longer words the higher the score, 
	//increasing difficulty. I also used splice to remove the word from the array and push in
	//a new one for the player to type. Finally, I reset the timer ball back to 0 to keep the game
	//running. 
	if (typefinal === matchword) {
		matchword =  RiTa.randomWord({maxLength: score + 4})
		typeword.splice(0, typeword.length)
		score +=1 
		bounceword.splice(0)
		bounceword.push(new words(matchword, random(500), random(height), score*.25+random(-1, 1), score*.25+random(-1, 1)))
		ballpos=0
		coin.play()
	}

	//Another way to increase difficulty is to create objects, in this case bouncing balls, 
	//to inhibit player vision, and distract them from the word they are trying to type. I 
	//decided to only start adding balls after 4 correct words to ease them into the game. 
	for (i = 0; i < score-4; i++) {
		
		balls.push(new Ball(random(-1, 1)+score, random(-1, 1)+score))
		balls[i].show()
		balls[i].move()
		// balls[i].sound()

	}

	bounceword[0].show()
	bounceword[0].move()

	//This is an easy way for the player to track how well they are doing
	fill(255)
	textSize(40)
	text('Score: ' + score, 100, 40)

	//this ball will serve as a visual timer
	//ballpos is reset by typing the word correctly as stated above
	noStroke()
	console.log(1/ballpos)
	fill(timercolor(ballpos/height).rgb())
	ellipse(700, ballpos, 100, 100)
	ballpos += (1+(score*.1))

	//This provides a definitive game over for the player, a large visual cue. 
	if (ballpos >= height) {

		noStroke()
		fill(chroma("crimson").rgb())
		rect(0, 0, width, height)


		noStroke()
		fill(0)
		textSize(100)
		text('Game Over', width/2, height/2)

		fill(0)
		textSize(50)
		text('Reload to Play Again', width/2, height*.75)

		noStroke()
		fill(255)
		textSize(75)
		text('Final Score: ' + score, width/2, height*.25)

		noLoop()
		table.stop()
		over.play()
	}


	//this helped me tell if the word was being typed correctly
	console.log(typefinal)
	
}

//receives the user/player's input, coupled with the afformentioned join() 
//were the backbone of making the game work
function keyTyped() {
	typeword.push(key)
}

//At first if the player mistyped, it would mean a game over, despite having time left
//To be more forgiving, I discovered how to remove the mistyped word,
//allowing the player to reset if they need to 
function keyPressed() {
	if (keyCode === BACKSPACE) {
		typeword.splice(0, typeword.length)
	}
}

//Another log to check to see if the program is working properly 
console.log(matchword)