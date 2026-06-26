from flask import Response, Blueprint, send_file
import csv
from io import BytesIO, StringIO

from flask_jwt_extended import get_jwt_identity, jwt_required
from openpyxl import Workbook
from main.models.transaction import Transaction

from main.services.statistcs import date_menager

export_bp = Blueprint('export', __name__, url_prefix='/export')

first_line = ['ID', 'Quantidade', 'Descrição', 'Tipo', 'Categoria', 'Criado em']

@export_bp.route('/csv', methods=['GET'])
@jwt_required()
def export_csv():
    
    transactions = Transaction.query.filter_by(user_id=get_jwt_identity()).order_by(Transaction.created_at.desc()).all()

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(first_line)
    
    for transaction in transactions:
        writer.writerow(
            [transaction.id, transaction.amount, transaction.description, transaction.type_of, transaction.category, date_menager(transaction.created_at)]
        )

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=transactions.csv"}
    )

@export_bp.route('/excel', methods=['GET'])
@jwt_required()
def export_excel():
    transactions = Transaction.query.filter_by(user_id=get_jwt_identity()).order_by(Transaction.created_at.desc()).all()

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Transactions"

    sheet.append(first_line)

    for transaction in transactions:
        sheet.append([transaction.id, transaction.amount, transaction.description, transaction.type_of, transaction.category, date_menager(transaction.created_at)])

    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='transactions.xlsx'
    )
