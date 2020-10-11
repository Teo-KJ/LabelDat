import csv
import io

from flask import make_response


class FileResponseCSV:

    def __init__(self, filename=None, csv_list=None):
        self.csv_list = csv_list

        self.sio = io.StringIO()
        self.cw = csv.writer(self.sio)
        self.content_disposition = f"attachment; filename={filename}.csv"
        self.content_type = "text/csv"

    def to_file_output(self):
        self.cw.writerows(self.csv_list)
        
        output = make_response(self.sio.getvalue())
        output.headers["Content-Disposition"] = self.content_disposition
        output.headers["Content-type"] = self.content_type
        return output
