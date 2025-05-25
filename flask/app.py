from flask import Flask
from flask import request,jsonify
from career_bot1 import run_bot

app = Flask(__name__)

@app.route('/bot', methods=[ 'POST'])
def login():
   data=request.json
   print(data)
   email=data["email"]
   message=data["message"]
   user_new=data["user_new"]
   questions=data.get("questions") or {}
 
   if(len(questions)==0):
      questions={}
   run_bot(email,user_new, message, questions)
   
   return jsonify({"data": data, "message": "Data received successfully"}), 200




if __name__ == '__main__':  
   app.run(host="0.0.0.0", port=5000)
 