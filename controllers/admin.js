const QuestionBank = require('../models/questions-bank');

const {generateQuestionId}=require('../middleware/Utility-functions')
// Handle form submission to add a question
exports.addQuestiontoBank= async (req, res) => {
  try {
    const { questionText, answers, correctAnswer, difficulty } = req.body;

    // Split answers string into an array
    const answerArray = answers.split(',').map(answer => answer.trim());

    // Create a new question object
    const newQuestion = {
      questionText,
      answers: answerArray,
      correctAnswer,
      difficulty
    };
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const generateQuestionId=`${timestamp}-${random}`
    console.log(generateQuestionId)
    // Save the new question to the database using Mongoose
    const question = new QuestionBank({
      questionId: generateQuestionId, // Ensure you generate a questionId
      questions: [newQuestion]
    });

    await question.save();

    res.status(201).send('Question added successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while adding the question.');
  }
}
// Controller function to show all questions in the question bank
exports.showAllQuestions = async (req, res) => {
    try {
      const questions = await QuestionBank.find({}); // Retrieve all questions from the database
      console.log(questions.length)
      res.render('view-question', { questions }); // Render a Pug file to display all questions
    } catch (error) {
      res.status(500).json({ 
        status: 'failure',
        message: 'An error occurred while fetching questions.'
      });
    }
  };
  
