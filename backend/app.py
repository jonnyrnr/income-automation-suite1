from flask import Flask, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

DEVICES = [
    {
        'name': 'ESP32 Sensor Hub',
        'online': True,
        'earnings': 12.37,
        'last_sync': datetime.datetime.now().isoformat()
    },
    {
        'name': 'Raspberry Pi Logger',
        'online': True,
        'earnings': 34.12,
        'last_sync': datetime.datetime.now().isoformat()
    },
    {
        'name': 'Arduino Controller',
        'online': False,
        'earnings': 8.76,
        'last_sync': (datetime.datetime.now() - datetime.timedelta(hours=5)).isoformat()
    }
]

@app.route('/devices', methods=['GET'])
def get_devices():
    return jsonify(DEVICES)

@app.route('/earnings', methods=['GET'])
def get_earnings():
    total = sum([d['earnings'] for d in DEVICES])
    return jsonify({"total": total})

if __name__ == '__main__':
    app.run(debug=True)
