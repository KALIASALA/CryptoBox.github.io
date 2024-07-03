from flask import Flask, render_template, url_for

app = Flask(__name__)

#отслеживание главной странички


@app.route('/')
@app.route('/home')
def index():
    return render_template("index.html")


@app.route('/chest')
def chest():
    return render_template("chest.html")


@app.route('/exchange')
def exchange():
    return render_template("exchange.html")

@app.route('/gift')
def gift():
    return render_template("gift.html")




@app.route('/user/<string:name>/<int:id>')
def user(name, id):
    return "User page " + name + "-" + str(id)



if __name__ == '__main__':
    app.run(debug=True)