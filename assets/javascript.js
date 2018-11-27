$(document).ready(function () {
   
 $("#start").on('click', function () {
        $(this).hide();
        game.countdown();
        game.displayQuestion();
    })
    
    $(document).on('click' , '.answer-button', game.guessChecker);
    

})
var images = $("#image-holder");
var quiz = $("#quiz-area");

var questions = [{
    question: "Who blew up the first Death Star?",
    answers: ["Luke Skywalker", "Obi-wan Kenobi", "Han Solo", "Princess Leia"],
    correctAnswer: "Luke Skywalker",
    image: "assets/images/luke.png"
}, {
    question: "What weapon do Jedi/Sith use in combat?",
    answers: ["Blaster", "Lightsaber", "Lightsowrd", "Staff"],
    correctAnswer: "Lightsaber",
    image: "assets/images/revan.jpg"
}, {
    question: "Who is Luke Skywalker's Father?",
    answers: ["Obi-wan Kenobi", "Emperor Palpatine", "Darth Vader", "Qui-gon Jin"],
    correctAnswer: "Darth Vader",
    image: "assets/images/darthvader.jpg"
}, {
    question: "What is the power Jedi/Sith are able to use? ",
    answers: ["The Schwartz", "The Force", "Magic", "Science"],
    correctAnswer: "The Force",
    image: "assets/images/Belth_Allusis_Botha.png"
}, {
    question: "What is the Empire's main star fighter called?",
    answers: ["X-Wing", "A-Wing", "Millenium Falcon", "Tie Fighter"],
    correctAnswer: "Tie Figher",
    image: "assets/images/TIEvsX-wing-SWSB.jpg"
}, {
    question: "Where is the Rebel Base located in The Empire Strikes Back?",
    answers: ["Yavin 4", "Endor", "Mustafar", "Hoth"],
    correctAnswer: "Hoth",
    image: "assets/images/echobase.jpg"
}, {
    question: "What is the name of the Bounty Hunter who captured Han Solo?",
    answers: ["Boba Fett", "Bossk", "IG-88", "Dengar"],
    correctAnswer: "Boba Fett",
    image: "assets/images/bobafett.jpg"
}];
var correctAnswers = ["Boba Fett", "Hoth", "Tie Fighter", "Darth Vader", "Luke Skywalker", "Lightsaber", "The Force"];
var countStartNumber = 30;
var timer;

var game = {
    questions: questions,
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    counter: countStartNumber,
    unanswered: 0,
    startTimer: start,

    countdown: function (){
        game.counter--;
        $("#timer").text(game.counter);
        if (game.counter === 0) {
          game.outOfTime();
        }
    },
    
    displayQuestion: function (){
        timer = setInterval(game.countdown, 1000);
        quiz.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
          quiz.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
          + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
       
    },
    
    nextQuestion: function(){
        game.counter = countStartNumber;
        $("#timer").text(game.counter);
        game.currentQuestion++;
        game.displayQuestion();
       
    },

    outOfTime: function(){
        
        clearInterval(timer);
        quiz.html('<h3>Sorry youre outta time!</h3>');
        quiz.html('<h4>The Correct answer was: ' + questions[this.currentQuestion].correctAnswer + '<h4>');
        images.append('<img src="' + questions[this.currentQuestion].image + '"/>');
        if (game.currentQuestion === questions.length -1){
            setTimeout(game.results, 3 * 1000)

        } else{
            setTimeout(game.nextQuestion, 3 * 1000);
        }
        
    },

    results: function(){
        clearInterval(timer);
        quiz.html('<h3>Correct Answers: ' + game.correct + '</h3>');
        quiz.html('<h3>Incorrect Answers: ' + game.incorrect+ '</h3>');
        quiz.html('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        quiz.html('<h3>Sorry but youre outta time!</h3>');

    },
    
    guessChecker: function(){
       // I tired multiple ways to define the correct answers in the question array but the code does not know what im refrencing to get the correct answer.
        var userAnswer = ($(this).attr("data-name"));
        console.log(correctAnswers);
       
        if (userAnswer === correctAnswers) {
            game.correct++;
            clearInterval(timer);
            quiz.html("<h2>That was correct!</h2>");
            images.append('<img src="' + questions[this.currentQuestion].image + '"/>');
          }
        
        else {
            game.incorrect++;
            clearInterval(timer);
            quiz.html('<h2>Nope! That was totally wrong!</h2>');
            quiz.html('<h3>The Correct answer was: ' + questions[this.currentQuestion].correctAnswer + '<h3>');
            images.append('<img src="' + questions[this.currentQuestion].image + '"/>');
        }
    },



    reset: function(){
        this.currentQuestion = 0;
        this.counter = 30;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
  }





