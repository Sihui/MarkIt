import re

db.define_table('url',
                Field('Modified','datetime',default=request.now),
                Field('Visited', 'datetime', default=request.now),
                Field('Owner',db.auth_user,default=(auth.user_id if auth.is_logged_in() else '5372e3309256a31f4fdf6bd8')),
                Field('Title','string',notnull=True),
                Field('URL',notnull=True,unique=True),
                Field('Note','text',default=""),
                Field('Private','boolean',notnull=True,default=False),
                format='%(URL)s')
db.url.Title.requires=IS_NOT_EMPTY()
db.url.Owner.readable = db.url.Owner.writable = False
db.url.Modified.readable = db.url.Modified.writable = False
db.url.Visited.readable = db.url.Visited.writable = False
#db.url.URL.requires=[IS_URL(error_message='URL Error'),
#                     IS_NOT_IN_DB(db, 'url.URL',error_message='Dupilcated URL')]

db.url.URL.requires = [lambda url: (re.sub(r'http[s]?://', '', url), None),
                       IS_URL(prepend_scheme=None,error_message='URL Error'),
                       IS_NOT_IN_DB(db, 'url.URL',error_message='Dupilcated URL')]

'''
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
db.url.URL.requires=[IS_URL(error_message='URL Error'),
                 scheme_independant_url_is_not_in_db(db,'url.URL',error_message='Dupilcated URL')]   
'''
