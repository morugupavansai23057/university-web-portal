const evaluateAssignment = async (filePath) => {
    // Simple mock AI evaluation
    return {
        score: Math.floor(Math.random() * 30) + 70, // random 70-100
        feedback: "Good structure and relevant content. Improve grammar slightly."
    };
};

module.exports = evaluateAssignment;
