import History from '../models/history.js';



import joi from 'joi';


export const sendhistory=async (req, res) => {
try{
    const schema = joi.object({
        email: joi.string().email().required(),
        message: joi.string().required(),
        
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { email, message,id } = req.body;
     // email=req.user

    try {
    // Replace with the API you want to call
  /*  const response = await axios.post('https://api.example.com/data', {
      email: email,
      message: message
    });
    console.log(response.data);*/
    const recent = await History.findOne(
  { email: email },
  {  _id: 0,
    email: 1,
    chat_history: { $slice: -1 }
  }
);
    if (!recent) {
      return res.status(404).json({ message: 'No histor  output for this user' });
    }
    
    // Send the response from the external API to your frontend
  //  res.json(response.data);
  res.status(200).json({ message: 'Data sent successfully', data: recent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed' });
  }
}
catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });





}

}

 export const loadhistory = async (req, res) => {
    try{
        const {email}=req.body
      // const email=req.user

       const history =await History.find({ email: email });
       if (!history) {
           return res.status(404).json({ message: 'No history found for this user' });
       }
       else{


              res.status(200).json(history[0]["chat_history"]);
       }


    }

    catch(err){

return res.status(400).json({ message: err.message });

    }

}



 export const temp_create_history=async(req,res)=>{
    try{
       
          const {
      email,
      started_at,
      updated_at,
      user_answers,
      chat_history
    } = req.body
       //  const  email=req.user

      const newHistory = await History.create({
        ///
      email:email,
      started_at: started_at ? new Date(started_at) : new Date(),
      updated_at: updated_at ? new Date(updated_at) : new Date(),
      user_answers,
      chat_history: chat_history.map(chat => ({
        from: chat.from,
        text: chat.text,
        time: chat.time ? new Date(chat.time) : new Date()
      }))
    });

        res.status(200).json({ message: 'History created successfully', history });
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

