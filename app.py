from flask import Flask, Blueprint, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

bp = Blueprint('routes', __name__)

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=['http://127.0.0.1:5500'])

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USERNAME'] = 'bsemeniy@gmail.com'
    app.config['MAIL_PASSWORD'] = 'lfbwdpnmgaplhjpo'

    mail = Mail(app)

    @bp.route('/order', methods=['POST'])
    def order():
        data = request.json
        recipient_email = request.form.get('recipient_email')
        success, message = send_order_email(data, recipient_email)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 500
    
    def send_order_email(data, recipient_email):
        car_make = data.get('carMake')
        car_model = data.get('carModel')
        car_year = data.get('carYear')
        has_thrust = data.get('hasThrust')
        rug_background_color = data.get('rugBackgroundColor')
        rug_outline_color = data.get('rugOutlineColor')
        set_type = data.get('setType')
        user_email = data.get('userEmail')
        user_name = data.get('userName')

        msg = Message('Заказ коврика', sender='bsemeniy@gmail.com', recipients=[recipient_email])
        msg.body = f'Заказ коврика:\nМарка автомобиля: {car_make}\nМодель автомобиля: {car_model}\nГод выпуска: {car_year}\nНаличие шипов: {has_thrust}\nЦвет коврика: {rug_background_color}\nЦвет обводки: {rug_outline_color}\nТип набора: {set_type}\nИмя пользователя: {user_name}'

        try:
            mail.send(msg)
            return True, 'Email sent successfully'
        except Exception as e:
            return False, str(e)

    return app

if __name__ == '__main__':
    app = create_app()
    app.register_blueprint(bp)
    app.run(debug=True)

