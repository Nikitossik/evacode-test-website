from flask import Flask, Blueprint, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

bp = Blueprint('routes', __name__)

# Фиксированный адрес отправителя
SENDER_EMAIL = 'Vi.carmats@gmail.com'

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USERNAME'] = 'Vi.carmats@gmail.com'
    app.config['MAIL_PASSWORD'] = 'kjinkzwzzkbyprof'

    mail = Mail(app)

    @bp.route('/phone-number', methods=['POST'])
    def phone_number():
        data = request.json
        success, message = send_phone_email(data)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 500
        
    def send_phone_email(data):
        try:
            user_phone = data.get('userPhone')

            # Фиксированный адрес получателя
            recipient_email = 'ifbayuk@gmail.com'

            msg = Message('Conlultation by phone number', sender=SENDER_EMAIL, recipients=[recipient_email])
            msg.body = f'Conlultation by phone number\nClients phone number: {user_phone}'

            mail.send(msg)
            return True, 'Your request was sent successfully!'
        except Exception as e:
            return False, str(e)

    @bp.route('/order', methods=['POST'])
    def order():
        data = request.json
        success, message = send_order_email(data)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 500
    
    def send_order_email(data):
        try:
            car_make = data.get('carMake')
            car_model = data.get('carModel')
            car_year = data.get('carYear')
            rug_background_color = data.get('rugBackgroundColor')
            rug_outline_color = data.get('rugOutlineColor')
            set_type = data.get('setType')
            user_phone = data.get('userPhone')
            user_name = data.get('userName')
            user_email = data.get('userEmail')  # Get client's email from JSON data
            user_date = data.get('date')        # Get date from JSON data

            # Фиксированный адрес получателя
            recipient_email = 'ifbayuk@gmail.com'

            msg = Message('New order', sender=SENDER_EMAIL, recipients=[recipient_email])
            msg.body = f'CarMat order:\nCar make: {car_make}\nCar model: {car_model}\nCar year: {car_year}\nCarmat color: {rug_background_color}\nTrim color: {rug_outline_color}\nSet type: {set_type}\nClients Name: {user_name}\nClients phone number: {user_phone}\nClients email {user_email}\nDate and time: {user_date}'

            # Отправка подтверждения клиенту
            confirmation_msg = Message('Confirmation of Your EVA Carmats Order', sender=SENDER_EMAIL, recipients=[user_email])
            confirmation_msg.body = f'Dear {user_name},\n\nWe appreciate your recent order for car mats and are excited to share that it has been successfully processed. Your choice in enhancing your vehicle\'s interior with our new generation car mats is valued.\n\nHere are the details of your order:\n• Product:\nCar make - {car_make};\nCar model - {car_model};\nCar year - {car_year};\nMat color - {rug_background_color};\nTrim color - {rug_outline_color}\n• Set Name: {set_type} (+Footrest for a driver mat as a gift!)\n\nOur team will be reaching out to you shortly to confirm the order and shipping information any questions you may have. Your satisfaction is our priority, and we are committed to ensuring a seamless experience.\n\nShould you need immediate assistance, feel free to contact our customer service team at +1 613-985-7956.\n\nThank you for choosing us for your automotive accessory needs. We look forward to serving you.\n\nBest regards,\nV&I Carmats\n+1 613-985-7956'
            mail.send(confirmation_msg)


            mail.send(msg)
            return True, 'Your request was sent successfully!'
        except Exception as e:
            return False, str(e)
        
    @bp.route('/questions', methods=['POST'])
    def questions():
        data = request.json
        success, message = send_questions_email(data)
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 500
        
    def send_questions_email(data):
        try:
            user_name = data.get('userName')
            user_email = data.get('userEmail')
            user_message = data.get('userMessage')

            # Фиксированный адрес получателя
            recipient_email = 'ifbayuk@gmail.com'

            msg = Message('Questions', sender=SENDER_EMAIL, recipients=[recipient_email])
            msg.body = f'Clients Name: {user_name}\nClients Email: {user_email}\nClients Question: {user_message}'

            mail.send(msg)
            return True, 'Your message was sent successfully!'
        except Exception as e:
            return False, str(e)


    return app

if __name__ == '__main__':
    app = create_app()
    app.register_blueprint(bp)
    app.run(debug=True)