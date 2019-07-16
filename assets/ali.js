// Select questions from array
// Put questions in area and put answer in answers area
// Delete object from array
// Set Timer 

// Parameters
// - when an answer is clicked, running timer will top and show result; the next timer will run to go to the next question
// - selected Right 
// -- within 30 seconds but after 15 seconds, add 10 points to points
// -- within  15 seconds, add 10 points to points and increase/add speed points
// --- spead points increase by itselft (10 -> 20 -> 40 ect.)
// - selected WRONG
// -- show right answer and after 5 seconds move to the next question

var aliQuestions = [
    {
        question: "When Ali achieves a high enough income bracket, she would like what kinds of mangoes?",
        a: "Danielle Manoges",
        b: "Rebecca Manoges",
        c: "Noah Mangoes ", // answer
        d: "Pete Manoges",
        correctID: "answerC",
        correct: "Noah Mangoes ",
        gif: "./assets/img/ali1.gif"
    },
    {
        question: "How does Ali describe skater-boys?",
        a: "Alternative on the outside, Beer on the inside ",
        b: "Cool on the outside, Nerd on the inside ",
        c: "Sexy on the outside, Malt Liquer on the inside ", // answer
        d: "Dare Devil on the outside, in need of therapy on the inside ",
        correctID: "answerC",
        correct: "Sexy on the outside, Malt Liquer on the inside ",
        gif: "./assets/img/ali2.gif"
    },
    {
        question: "What show does Ali compare joining a mom's group to?",
        a: "Keeping up with the Kardashians, love or hate, you have to stick together",
        b: "Big Little Lies, us moms gotta stick together",
        c: "Game of Thrones, its a fight to be on the throne",
        d: "The Walking Dead, you just gotta hook up with a crew to survive", // answer
        correctID: "answerD",
        correct: "The Walking Dead, you just gotta hook up with a crew to survive",
        gif: "./assets/img/ali3.gif"
    },
    {
        question: "How does Ali view breastfeeding?",
        a: "Like a beautiful bonding ceremony",
        b: "It is chronic physical torture", // answer
        c: "As if you're being shredded through a tree shredder",
        d: "Like feeling when you hear the man version of 'Somewhere Over the Rainbow'",
        correctID: "answerB",
        correct: "It is chronic physical torture",
        gif: "./assets/img/ali4.gif"
    },
    {
        question: "According to Ali, what do Asian men smell like?",
        a: "A Secure Future",
        b: "Responsibility", // answer
        c: "Harvard",
        d: "Money",
        correctID: "answerB",
        correct: "Responsibility",
        gif: "./assets/img/ali5.gif"
    },
    {
        question: "What are Ali's financial aspirations?",
        a: "To see a quarter and walk away", // answer
        b: "To buy a $8 juice",
        c: "To get a Netflix subscription",
        d: "To buy fruit picked by white people",
        correctID: "answerA",
        correct: "To see a quarter and walk away",
        gif: "./assets/img/ali6.gif"
    },
    {
        question: "According to Ali, she doesn't want to lean in. She wants to ...",
        a: "Stay Home",
        b: "Sleep",
        c: "Roll Around",
        d: "Lay Down", // answer
        correctID: "answerD",
        correct: "Lay Down",
        gif: "./assets/img/ali7.gif"
    },
    {
        question: "In the end, who trapped who's ass? ",
        a: "No one is trapped, it's called divorce",
        b: "She trapped his ass",
        c: "She trapped his ass, then he trapped her ass",
        d: "Ali's Husband trapped her", // answer
        correctID: "answerD",
        correct: "Ali's Husband trapped her ass",
        gif: "./assets/img/ali8.gif"
    },
    {
        question: "Who is the real breadwinner in Ali's family?",
        a: "Ali, because she earnes more",
        b: "Her Husband, becuase he won a bread machine", // answer
        c: "Her Daughters, becuase they eat bread",
        d: "Her Dog, becuase she is like bread ... soft",
        correctID: "answerB",
        correct: "Her Husband, becuase he won a bread machine",
        gif: "./assets/img/ali9.gif"
    },
    {
        question: "Ali identifies as ... ",
        a: "Half-fancy Asian and half-jungle Asian", // answer
        b: "Half-lazy Asian and half-smart Asian",
        c: "Half-sexy Asian and half-rich Asian",
        d: "Half-rich Asian and half-fancy Asian",
        correctID: "answerA",
        correct: "Half-fancy Asian and half-jungle Asian",
        gif: "./assets/img/ali10.gif"
    },
]

var usedQuestions = [];
var usedObject = [];
var currentSet;
var currentQuestion;
var answerA;
var answerB;
var answerC;
var answerD;
var answerCorrectID;

var intervalID;
var nextQuesID;
var time = 30;
var nextTime = 4;
var speedPoints = 10;
var points = 0;

var questionsRemain = aliQuestions.length;
var questionsRight = 0;
var questionsWrong = 0;
var unanswered = 0;

$(document).ready(function () {

    $(".play").on("click", function () {
        startInterval();
        pickingQuestion();

        $(".play").hide();
        $(".gamebox").show();
        $(".scoring").show();
    })


    // Making the Div for the answers
    // answer A and C
    var answerADiv = $("<div>");
    answerADiv.addClass("individualAnsw col-5");
    answerADiv.attr("id", "answerA");
    answerADiv.appendTo(".answersAC");

    var answerCDiv = $("<div>");
    answerCDiv.addClass("individualAnsw col-5");
    answerCDiv.attr("id", "answerC")
    answerCDiv.appendTo(".answersAC")

    // answer B and D
    var answerBDiv = $("<div>");
    answerBDiv.addClass("individualAnsw col-5");
    answerBDiv.attr("id", "answerB")
    answerBDiv.appendTo(".answersBD")

    var answerDDiv = $("<div>");
    answerDDiv.addClass("individualAnsw col-5");
    answerDDiv.attr("id", "answerD")
    answerDDiv.appendTo(".answersBD")


    // YAY GIF
    var answerCorrectGif = $("<img>");
    answerCorrectGif.addClass("Answer answerGif");
    answerCorrectGif.attr("id", "correctGif")
    answerCorrectGif.appendTo(".gif")


    // Picking Random Question to display
    function pickingQuestion() {
        currentSet = aliQuestions[Math.floor(Math.random() * aliQuestions.length)];
        currentQuestion = currentSet.question;
        $(".individQuest").text(currentQuestion);

        answerA = currentSet.a;
        answerADiv.text(answerA);

        answerB = currentSet.b;
        answerBDiv.text(answerB);

        answerC = currentSet.c;
        answerCDiv.text(answerC);

        answerD = currentSet.d;
        answerDDiv.text(answerD);

        answerCorrect = currentSet.correct;
        $(".answer").text(answerCorrect);

        answerCorrectID = currentSet.correctID;

        answerGifSource = currentSet.gif;
        answerCorrectGif.attr("src", answerGifSource)

        // pushing used Question into array
        usedQuestions.push(currentQuestion);
        usedObject.push(currentSet)
    }

    // Removing question from Array Function
    function removeQuestion() {
        var removedQuestion = aliQuestions.slice(0);
        removedQuestion.forEach(function (element) {
            if (usedQuestions.includes(element['question'])) {
                let removeIndex = aliQuestions.map(function (item) {
                    return item['question']
                }).indexOf(element['question']);
                aliQuestions.splice(removeIndex, 1);
            }
        });
    }

    // Timing (clock)
    function startInterval() {
        intervalID = setInterval(function () {
            time--;
            displayTime = timeConverter(time);
            $("#timer").text(displayTime);

            // what happens if you dont choose anything within the 30 secons
            if (time === 0) {
                unanswered++;
                stopInterval();

                removeQuestion();
                $("#remainingQ").html(aliQuestions.length);
                $(".result").text("Oops! Looks like you ran out of time. Try again next time!");

                $(".allAnsw").hide();
                $(".answerbox").show();

                nextQuestionTiming();

            }
        }, 1000)
    }

    function stopInterval() {
        clearInterval(intervalID);
    }

    function timeConverter(t) {
        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }

    // Picking Right Answer

    $(".individualAnsw").on("click", function () {
        stopInterval()
        removeQuestion();
        $("#remainingQ").html(aliQuestions.length);

        var guess = $(this).attr("id")
        if (time >= 15 && guess == answerCorrectID) {
            points = points + 10 + speedPoints;
            $("#totalPoints").text(points)
            $("#speedPoints").text(speedPoints)

            questionsRight++;
            $("#correct").text(questionsRight);

            $(".result").text("Great Job! You're just making it rain points aren't you? 10 Points for the correct answer and more points for your speediness.");

            $(".allAnsw").hide();
            $(".answerbox").show();

            nextQuestionTiming();

            speedPoints = speedPoints + speedPoints;
        } else if (time <= 15 && guess == answerCorrectID && time > 0) {
            points = points + 10;
            $("#totalPoints").text(points);
            $("#speedPoints").text("0");

            questionsRight++;
            $("#correct").text(questionsRight);

            $(".result").text("Great Job! 10 points to you!");

            $(".allAnsw").hide();
            $(".answerbox").show();

            nextQuestionTiming();
        } else {
            questionsWrong++;
            $("#speedPoints").text("0");
            $(".result").text("Oops! You picked the wrong one. No more overpriced mangoes for you! Try again next time!");

            $(".allAnsw").hide();
            $(".answerbox").show();

            nextQuestionTiming();
        }
    });

    // Timing (next question)
    function nextQuestionTiming() {
        nextQuesID = setInterval(function () {
            nextTime--
            if (nextTime === 0) {
                stopNext();
                $(".allAnsw").show();
                $(".answerbox").hide();
                nextTime = 4;
                nextQuestion()
            }
        }, 1000);
    }

    function stopNext() {
        clearInterval(nextQuesID);
    }

    function nextQuestion() {
        if (aliQuestions.length === 0) {
            // ending Game
            stopInterval();
            stopNext();

            $(".individQuest").html('Congrats! You got ' + questionsRight + ' questions right, and ' + questionsWrong + ' questions wrong! Oops, look like you did not answer ' + unanswered + ' question(s). <br> Oh dang! You scored ' + points + ' points! Look at you, so Harvard-like. <br>')
            $(".allAnsw").hide();
            $(".answerbox").hide();

            // restart button
            var restartButton = $("<button>");
            restartButton.addClass("restartButton");
            restartButton.text("Restart Game");
            restartButton.appendTo(".individQuest")

            $(".restartButton").on("click", function () {
                restartGame();
            })

        } else {
            // reset for next Q
            resetGame()
            pickingQuestion();
        }
    }

    // restart game click


    function resetGame() {
        time = 30;
        displayTime = timeConverter(time);
        $("#timer").text(displayTime);

        // re run count down
        startInterval()
    }

    function restartGame() {
        // reseting array
        aliQuestions = usedObject;
        questionsRemain = 10;
        $("#remainingQ").text(questionsRemain);

        // reseting used questions
        usedQuestions = [];
        usedObject = [];

        // reset questions right (on screen) and wrong (internal)
        questionsRight = 0;
        $("#correct").text(questionsRight);
        questionsWrong = 0;

        // picking Questions
        pickingQuestion();

        // reseting timer and new question
        time = 30;
        displayTime = timeConverter(time);
        $("#timer").text(displayTime);

        // re run count down
        startInterval()

        $(".allAnsw").show();
        $(".restartButton").hide();

        // reseting points
        points = 0;
        speedPoints = 10;
        $("#totalPoints").text(points)
        $("#speedPoints").text("0")
        
    }


});