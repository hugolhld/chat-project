import os
from flask import Flask, jsonify, request
import numpy as np
# from flask_mysqldb import MySQL
import pymysql

app = Flask(__name__)

app.config['MYSQL_HOST'] = "185.224.137.180"
app.config['MYSQL_USER'] = "u549231978_hetic_g_02"
app.config['MYSQL_PASSWORD'] = "Hetic2023$"
app.config['MYSQL_DB'] = "u549231978_hetic_g_02"
app.config['MYSQL_PORT'] = 3306

mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB'],
    port=app.config['MYSQL_PORT']
)

print(os.listdir(os.getcwd()))

@app.route('/')
def home():
    print(os.listdir(os.getcwd()))
    return 'Je suis bien sur la page principale'

@app.route('/get_users/<int:user_id>', methods=['GET'])
def get_users(user_id):
    try :
        cursor = mysql.cursor()

        # cursor.execute("SELECT * FROM users")
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        users = cursor.fetchall()

        users_json = [{'id': user[0], 'first_name': user[1], 'last_name': user[2], 'password': user[3], 'mail': user[4]} for user in users]

        cursor.close()
        mysql.close()

        return jsonify({'users': users_json})

    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/sendMsg', methods=['POST'])

@app.route('/addUser', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        required_fields = ['first_name', 'last_name', 'password', 'mail']

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est manquant'}), 400
        
        cursor = mysql.cursor()

        cursor.execute("INSERT INTO user (first_name, last_name, password, mail) VALUES (%s, %s, %s, %s)", (data['first_name'], data['last_name'], data['password'], data['mail']))
        mysql.commit()

        new_user_id = cursor.lastrowid

        cursor.close()
        mysql.close()

        return jsonify({'message': 'Utilisateur créé avec succès', 'user_id': new_user_id}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500








@app.route('/messages', methods=['GET'])

@app.route('/messages/<int:id>', methods=['GET'])

@app.route('/users', methods=['GET'])

@app.route('/users/<int:id>', methods=['GET'])

@app.route('/users/<int:id>', methods=['UPDATE'])

@app.route('/users/<int:id>', methods=['DELETE'])






@app.route('/about')
def about():
    return 'About Page Route'


@app.route('/portfolio')
def portfolio():
    a = np.random.choice([1, 2, 3, 4, 5, 6])
    return f'Portfolio {a} Page Route'


@app.route('/contact')
def contact():
    return 'Contact Page Route'


@app.route('/api')
def api():
    with open(
            os.path.join(os.getcwd(), 'data', 'data.json'),
            mode='r'
    ) as my_file:
        text = my_file.read()
        return text




if __name__ == '__main__':
    #port = int(os.environ.get('PORT', 5000))
    print(os.getcwd())
    # app.run(host='0.0.0.0', port=port)