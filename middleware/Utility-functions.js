module.exports.generateQuestionId= async()=>{
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}-${random}`;
}
