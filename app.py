
from flask import Flask, render_template, request, jsonify
from flask_wtf.csrf import CSRFProtect
from main import postQuestion
from datetime import date

app = Flask(__name__)
csrf = CSRFProtect(app)
csrf.init_app(app)
app.config.update(dict(
    SECRET_KEY="powerful secretkey",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))
current_year = date.today().year


@app.route('/')
def homepage():
    return render_template('main.html',year= current_year) 


@app.route('/docs')
def docspage():
    return render_template('doc.html',year= current_year)

@app.route('/post')
def postpage():
    return render_template('post.html', year= current_year)


@app.route('/faq')
def faqpage():
    return render_template('faq.html', year= current_year)



@app.route('/form/data', methods=['POST', 'GET'])
def form_data():
    if request.method == "POST":
        data = request.get_json()
        postQ = postQuestion(data)
        results = postQ.post_question()
    return jsonify( results)
        
if __name__ == '__main__':
    app.run(port=5000, debug=True)