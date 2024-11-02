from flask import Blueprint
from app.controllers import controllers_uploads

bp = Blueprint("upload", __name__, url_prefix="/upload")


bp.post("")(controllers_uploads.create_uploads)
bp.get("")(controllers_uploads.read_all_uploads)
bp.patch("")(controllers_uploads.update_all_uploads)
bp.delete("")(controllers_uploads.delete_all_uploads)