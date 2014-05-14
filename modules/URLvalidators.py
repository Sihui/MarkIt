'''
Since the build-in IS_URL and IS_NOT_IN_DB function 
do not handle cases where the url start with https.
This costomized validator handler these cases.
'''
from gluon.validators import *

class scheme_independant_url_is_not_in_db:
    def __init__(self, db,error_message='Duplicate URL'):
        self.db = db
        self.e = error_message

    def __call__(self, value):
        # test the entered uri
        url_validator = IS_NOT_IN_DB(db,'url.URL')
        value, error = url_validator(value)
        if error: 
            return value,self.e
        # find the opposing scheme
        if value.lower().startswith('http:'):
            opposite_scheme_value =  'https:'+value[5:] 
        elif value.lower().startswith('https:')
            opposite_scheme_value =  'http:'+value[6:] 
        # error on the opposite_scheme_value in db
        value, error = url_validator(opposite_scheme_value)
        if error: 
            return value,self.error_message
        # return the original url, preserving the original scheme
        return (value, None)