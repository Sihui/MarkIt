db.define_table('tag',
                Field('Tag',notnull=True,unique=True),
                Field('Color', widget = color_widget.widget),
                Field('Owner',db.auth_user,default=(auth.user_id if auth.is_logged_in() else '5372e3309256a31f4fdf6bd8')),
                format='%(Tag)s')
db.tag.Owner.readable = db.tag.Owner.writable = False
db.tag.Tag.requires=[IS_NOT_IN_DB(db, 'tag.Tag',error_message='Dupilcated Tag'),
                     IS_NOT_EMPTY(error_message='Tag name could not be empty')]