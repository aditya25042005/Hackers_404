from flask import Flask
from flask import request,jsonify

app = Flask(__name__)

@app.route('/bot', methods=[ 'POST'])
def login():
   data=request.json
   email=data.email,
   message=data.message,
   user_new=data.user_new,
   quetions=data.questions
   
   return jsonify({"data": data, "message": "Data received successfully"}), 200




if __name__ == '__main__':  
   app.run(debug=True)  