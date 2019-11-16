//post request URL
const URL = "http://localhost:9000/sendEmail";

//function to make a post request to lambda function using the fetch API
const sendEmail = async (url, data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

//get form element
submissionFeedback = document.querySelector("#submissionFeedback");
emailForm = document.querySelector("#emailForm");
emailForm.addEventListener("submit", e => {
  e.preventDefault();

  //create input object to send as body of the event when the lambda function is invoked
  const message = {
    to: e.target[0].value,
    subject: e.target[1].value,
    message: e.target[2].value
  };

  sendEmail(URL, message)
    .then(response => {
      //if successful show feedback to client
      if (response.result === "success") {
        submissionFeedback.innerText = " Email Sent!";
        submissionFeedback.className = "text-white";
        console.log(submissionFeedback);
      } else {
        submissionFeedback.innerText = " Error. Please Retry";
        submissionFeedback.className = "text-danger";
        console.log(submissionFeedback);
      }
    })
    .catch(error => {
      console.log(error);
      submissionFeedback.innerText = " Error. Please Retry";
      submissionFeedback.className = "text-danger";
      console.log(submissionFeedback);
    });
});
