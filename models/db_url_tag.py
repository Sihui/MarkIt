# the many to many relationship between urls and tags
db.define_table('url_tag',
                Field('URL','reference url'),
                Field('Tag','reference tag'),
                format='%(URL)s %(Tag)s') 