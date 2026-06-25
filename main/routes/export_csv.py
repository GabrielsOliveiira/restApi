from flask import Response, Blueprint
import csv
from io import StringIO

from flask_jwt_extended import get_jwt_identity, jwt_required
from main.models.transaction import Transaction

csv_blueprint = Blueprint('csv', __name__)

@csv_blueprint.route('/export_csv', methods=['GET'])
@jwt_required()
def export_csv():
    
    transactions = Transaction.query.filter_by(user_id=get_jwt_identity()).order_by(Transaction.created_at.desc()).all()

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(['ID', 'Amount', 'description', 'type_of', 'Category', 'created_at'])
    
    for transaction in transactions:
        writer.writerow(
            [transaction.id, transaction.amount, transaction.description, transaction.type_of, transaction.category, transaction.created_at]
        )

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=transactions.csv"}
    )