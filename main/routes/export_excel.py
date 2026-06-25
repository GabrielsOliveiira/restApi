from flask import Blueprint, send_file, Response
from flask_jwt_extended import get_jwt_identity, jwt_required
from main.models.transaction import Transaction
import io as BytesIO
from openpyxl import Workbook

excel_bp = Blueprint('excel', __name__)

@excel_bp.route('/export_excel', methods=['GET'])
@jwt_required()
def export_excel():
    transactions = Transaction.query.filter_by(user_id=get_jwt_identity()).order_by(Transaction.created_at.desc()).all()

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Transactions"

    sheet.append(['ID', 'Quantidade', 'Descrição', 'Tipo', 'Categoria', 'Criado em'])

    for transaction in transactions:
        sheet.append([transaction.id, transaction.amount, transaction.description, transaction.type_of, transaction.category, transaction.created_at.strftime('%d/%m/%Y')])

    output = BytesIO.BytesIO()
    workbook.save(output)
    output.seek(0)

    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='transactions.xlsx'
    )
