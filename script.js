var currentQuestion = 0
var score = 0
var answer = -1
var questions = [
    {prompt:"1) What is the S&P 500?", answer:0, choices:["Yes", "No"], answered:false, correct: null},
    {prompt:"2) What should be the first line item in your budget?", answer:0, choices:["Savings", "Phone", "Food", "New shoes"], answered:false, correct: null},
    {prompt:"3) Which of these companies is in the S&P 500?", answer:0, choices:["Apple", "Stark Industries", "Initech", "Blue Star Airlines", "Monsters Incorporated"], answered:false, correct: null},
    {prompt:"4) Where is the safest place to keep your money (the least amount of risk)?", answer:1, choices:["Underneath your mattress", "Savings account", "Stock market", "Treasure chest on a remote island... with a map hidden behind a picture on your grandparent's wall."], answered:false, correct: null},
    {prompt:"5) The most reliable way to earn money is...", answer:3, choices:["To sell fake Louis Vuitton purses", "To scam your friends with emails", "To rob your local bank every other week wearing a different mask", "To get a job"], answered:false, correct: null},
    {prompt:"6) What is Debt?", answer:2, choices:["A 70's rock band", "A Clothing line", "Borrowed Money", "The village elder from the movie Frozen"], answered:false, correct: null},
    {prompt:"7) What is an interest rate (*challenge question)?", answer:3, choices:["The amount of money a bank or entity pays savers or lenders.", "The rate a bank or entity charges borrowers.", "A joint investment in agriculture enhancement between Greenland and the United States", "Both a and b"], answered:false, correct: null},
    {prompt:"8) What is a budget?", answer:3, choices:["A German automobile", "A droid from Star Wars The Rise of Skywalker", "A robotic credit card APP with a low APR", "A financial plan"], answered:false, correct: null},
    {prompt:"9) What is a stock?", answer:3, choices:["Corn grows on it", "Bank Debt", "tool used for retrieving golf balls", "A security that represents ownership in a company"], answered:false, correct: null},
    {prompt:"10) Who can invest?", answer:2, choices:["Only companies with greater than one hundred million dollars", "Only people with a college degree", "Everyone", "Only adults over the age of 21"], answered:false, correct: null}
];

function addPrompt(qN, animate){ // Appends prompt to empty question container
    answer = questions[currentQuestion].answer // Change the global variable answer to the new answer
    prompt = $("<h1>"+questions[qN].prompt+"</h1>") //Call the prompt
    prompt.attr("id", "prompt")
    if (animate == true){ // Allowing for the prompt to fade in
        prompt.hide()};
    $("#prompt-container").append(prompt); // Adding the prompt to its container
    if (animate == true){ // Proceed to fade that boy in
        prompt.fadeIn(1000)};
}

function addResponses(qN, animate){ // Appends responses to empty question container
    var q = 0; // Starting number for creating response IDs
    for (resp of questions[qN].choices){ // Loop for creating each response
        div = $("<div></div>"); // Creating the div which holds the response text
        div.attr("class", "response-box"); 
        div.attr("id", q); // Assign ID
        q ++; // Increment ID for next element
        h2 = $('<h2>' + resp + '</h2>'); // Create response h2
        h2.attr("class", "response" );
        div.append(h2); // Make response text and element of response box
        if (animate == true){ // Allow for fade in
            div.hide()};
        $("#responses-container").append(div); // Make response box an element of response-container
        if (animate == true){
            div.fadeIn(1000)};
    }
}

function initailizeProgressBar(){
    q = 0; 
    for (tab of questions){
        progressContainer = $("#progress-container");
        bar = $("<div></div>");
        bar.attr("class", "progress-box");
        bar.attr("id", "progressTile" + q)
        q ++
        progressContainer.append(bar);
    }
}

function updateProgressBar(){
    progressTile = $("#progressTile" + currentQuestion)
    if (questions[currentQuestion].correct == true){
        $(progressTile).animate({backgroundColor: "#1BBF8D"}, 1000, function(){});
    }
    else if (questions[currentQuestion].correct == false){
        $(progressTile).animate({backgroundColor: "#EC6A4A"}, 1000, function(){});
    }
}

function loadScorePage(){
    var green = Math.round(255 * (score/questions.length));
    var red = Math.round(255 - green);
    console.log(red);
    console.log(green);
    $("body").empty();
    scoreBox = $("<div></div>");
    scoreBox.attr("id","score-box")
    response = $("<h1>" + score + "/" + questions.length + "</h1>");
    $(scoreBox).append(response);
    $("body").append(scoreBox);
    $(scoreBox).animate({color: "rgb(" + red + "," + green + ",0)"}, 1000, function(){});

}

function nextQuestion(){
    $("#responses-container").empty(); // Empty responses container
    $("#prompt-container").empty(); // Empty prompt container
    currentQuestion ++;
    if (currentQuestion == questions.length){ // Go to score page condition
        loadScorePage();
    }
    else if(currentQuestion == questions.length-1){
        addPrompt(currentQuestion, true); // Add the prompt  
        addResponses(currentQuestion, true); // Add the responses
        $("#buttons-box").empty();
        finishButton = $("<h2>Complete Quiz</h2>");
        finishButton.attr("id", "finish-button");
        $("#buttons-box").append(finishButton);
    }
    else {
        addPrompt(currentQuestion, true); // Add the prompt  
        addResponses(currentQuestion, true); // Add the responses
    }
};

function previousQuestion(){ 
    $("#responses-container").empty();
    $("#prompt-container").empty();
    if (currentQuestion == 0){
        pass
    }
    else{
        currentQuestion --;
        addPrompt(currentQuestion, true);
        addResponses(currentQuestion, true);
    }
}

$(document).ready(function(){ // Page load-up
    addPrompt(currentQuestion, false); 
    addResponses(currentQuestion, false);
    initailizeProgressBar();
    $("#next").click(function (){ // Next button working
        nextQuestion();
    });
    $("#prev").click(function (){ // Previous button working
        previousQuestion();
    });

    $("body").on("click", "#finish-button", function () {
        loadScorePage();
    });


    $("body").on("click",".response-box", function(){ // Listener for clicking on prompts
        var correctAnswer = "#" + questions[currentQuestion].answer // Correct answer for checking user choice
        if (questions[currentQuestion].answered == false){ // Allowing response if user has not yet responded
            questions[currentQuestion].answered = true; // Setting the question to ansewred
            if ($(this).attr("id") == answer){ // Checking if correct
                questions[currentQuestion].correct = true;
                updateProgressBar();
                score += 1;
                $(this).animate({backgroundColor: "#1BBF8D", color: "white"}, 1000, function(){}); // Correct animation
            }
            else{
                questions[currentQuestion].correct = false;
                updateProgressBar();
                $(correctAnswer).animate({backgroundColor: "#1BBF8D", color: "white"}, 1000, function(){}); // Correct animaiton for correct color
                $(this).animate({backgroundColor: "#EC6A4A", color: "white"}, 1000, function(){}); // Wrong animation for selected color
            }
        }
        else {
            nextQuestion(); // Go to next question in prompt clicked again
        };
        console.log(score)
    });
});
