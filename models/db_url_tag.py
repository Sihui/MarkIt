# the many to many relationship between urls and tags
db.define_table('url_tag',
                Field('URL',notnull=True,writable=True,readable=True),
                Field('Tag',notnull=True,writable=True,readable=True),
                format='%(URL)s %(Tag)s') 
db.url_tag.URL.requires = [lambda url: (re.sub(r'http[s]?://', '', url), None),
                       IS_URL(prepend_scheme=None,error_message='URL Error')]
db.url_tag.Tag.requires=IS_NOT_EMPTY(error_message='Tag name could not be empty')
