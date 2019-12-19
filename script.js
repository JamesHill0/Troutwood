var currentQuestion = 0
var score = 0
var answer = -1
var questions = [
    {prompt:"1) What is the S&P 500?", answer:0, choices:["Yes", "No"]},
    {prompt:"2) What should be the first line item in your budget?", answer:0, choices:["Savings", "Phone", "Food", "New shoes"]},
    {prompt:"3) Which of these companies is in the S&P 500?", answer:0, choices:["Apple", "Stark Industries", "Initech", "Blue Star Airlines", "Monsters Incorporated"]},
    {prompt:"4) Where is the safest place to keep your money (the least amount of risk)?", answer:1, choices:["Underneath your mattress", "Savings account", "Stock market", "Treasure chest on a remote island... with a map hidden behind a picture on your grandparent's wall."]},
    {prompt:"5) The most reliable way to earn money is...", answer:3, choices:["To sell fake Louis Vuitton purses", "To scam your friends with emails", "To rob your local bank every other week wearing a different mask", "To get a job"]},
    {prompt:"6) What is Debt?", answer:2, choices:["a. A 70's rock band", "b. A Clothing line", "c. Borrowed Money", "d. The village elder from the movie Frozen"]},
    {prompt:"7) What is an interest rate (*challenge question)?", answer:4, choices:["a. The amount of money a bank or entity pays savers or lenders.", "b. The rate a bank or entity charges borrowers.", "c.  A joint investment in agriculture enhancement between Greenland and the United States", "d. Both a and b"]},
    {prompt:"8) What is a budget?", answer:3, choices:["a) A German automobile", "b) A droid from Star Wars The Rise of Skywalker", "c) A robotic credit card APP with a low APR", "d) A financial plan"]},
    {prompt:"9) What is a stock?", answer:3, choices:["a) Corn grows on it", "b) Bank Debt", "c) tool used for retrieving golf balls", "d) A security that represents ownership in a company"]},
    {prompt:"10) Who can invest?", answer:2, choices:["a)  Only companies with greater than one hundred million dollars", "b) Only people with a college degree", "c) Everyone", "d)   Only adults over the age of 21"]}
];


function addQuestion(qN, animate){
    answer = questions[currentQuestion].answer
    var q = 0
    question = $("<h1>"+questions[qN].prompt+"</h1>")
    question.attr("id", "question")
    if (animate == true){
        question.hide()};
    $("#question-box").append(question);
    if (animate == true){
        question.fadeIn(1000)};
    for (x of questions[qN].choices){
        div = $("<div></div>");
        div.attr("class", "text-box");
        div.attr("id", q);
        q ++;
        h2 = $('<h2>' + x + '</h2>');
        h2.attr("class", "response" );
        div.append(h2);
        if (animate == true){
            div.hide()};
        $("#responses").append(div);
        if (animate == true){
            div.fadeIn(1000)};
    }
}

function nextQuestion(){
    $("#responses").empty();
        $("#question-box").empty();
        currentQuestion ++;
        addQuestion(currentQuestion, true);
};

function previousQuestion(){
    $("#responses").empty();
        $("#question-box").empty();
        currentQuestion --;
        addQuestion(currentQuestion, true);

}



$(document).ready(function(){
    addQuestion(currentQuestion, false);
    $("#next").click(function (){
        nextQuestion();
    });
    $("#prev").click(function (){
        if (currentQuestion>0){
            previousQuestion();
        }
    });
    $("body").on("click",".text-box", function(){
        
        if ($(this).attr("id")==answer){
            score += 1
            $(this).animate({backgroundColor: "#1BBF8D", color: "white"}, 1000, function(){
            });
        }
        else {
            nextQuestion();
        };
        console.log(score)
    });
});
