#the many to many relationship between urls and folders
db.define_table('url_folder',
                Field('url','reference url'),
                Field('folder','reference folder'),
                format='%(url_folder)s %(id)s')