db.define_table('folder',
                Field('folder_name',notnull=True),
                Field('parent','reference folder'),
                Field('f_size','integer',default=0,writable=False),
                Field('created_by',db.auth_user,default=auth.user_id),
                format='%(folder_name)s %(parent)s')