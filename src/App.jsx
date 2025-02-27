import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import questions from "./questions"; 

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [score, setScore] = useState(0); 
  const [finished, setFinished] = useState(false); 
  const [userAnswers, setUserAnswers] = useState([]); 

  
  const handleAnswer = (selected) => {
    
    setUserAnswers([...userAnswers, selected]);

    
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1); 
    }

    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true); 
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Quiz Application
      </Typography>
      <Card sx={{ p: 3 }}>
        <CardContent>
          {!finished ? (
            <>
              <Typography variant="h5">
                {questions[currentQuestion].question}
              </Typography>
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </>
          ) : (
            <>
              <Typography variant="h4">Finished test 🎉</Typography>
              <Typography variant="h6">
                You answered {score} out of {questions.length} questions correctly!
              </Typography>

             
              <Typography variant="h6" sx={{ mt: 2 }}>
                Check your answers:
              </Typography>
              {questions.map((question, index) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="h6">
                    Question: {question.question}
                  </Typography>
                  <Typography variant="body1">
                    Your answer: {userAnswers[index]}{" "}
                    {userAnswers[index] === question.answer ? (
                      <span style={{ color: "green" }}>✔️ Correct</span>
                    ) : (
                      <span style={{ color: "red" }}>❌ Incorrect</span>
                    )}
                  </Typography>
                </Card>
              ))}

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setFinished(false);
                  setUserAnswers([]); 
                }}
              >
                Try again.
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
