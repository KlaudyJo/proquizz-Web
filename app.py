
from flask import Flask, render_template, request, jsonify
from flask_wtf.csrf import CSRFProtect
from main import postQuestion

app = Flask(__name__)
csrf = CSRFProtect(app)
csrf.init_app(app)
app.config.update(dict(
    SECRET_KEY="powerful secretkey",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))

@app.route('/')
def homepage():
    return render_template('main.html')

@app.route('/form/data', methods=['POST', 'GET'])
def form_data():
    if request.method == "POST":
        data = request.get_json()
        postQ = postQuestion(data)
        results = postQ.post_question()
    return jsonify( results)
        
if __name__ == '__main__':
    app.run(port=5000, debug=True)