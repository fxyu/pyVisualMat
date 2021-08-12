import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")
    sio.emit('sNewMatrix', [1,2,3,4])

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

sio.connect('http://localhost:5000')
print('my sid is', sio.sid)

sio.emit('sNewMatrix', [1,2,3,4])
sio.wait()

sio.disconnect()