from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# simple routing
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/new')
def new():
    data = {
        'array':list(range(16)),
        'title':"Testing"
    }
    socketio.emit('cNewMatrix', data)
    return "Sent"

@socketio.on('sNewMatrix')
def handle_sNewMatrix(data):
    # print('new Matrix!')
    # print(array)
    # data format:
    #   array:
    #   title:
    socketio.emit('cNewMatrix', data)

@socketio.on('connect')
def handle_new_connection():
    print('A user connected')
    # print(socket)

if __name__ == "__main__":
    # app.run(port=5000)
    print("Start Server!")
    socketio.run(app, debug=True, port=5000)
    