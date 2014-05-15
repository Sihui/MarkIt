# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################


def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html
 
    if you need a simple wiki simply replace the two lines below with:
    return auth.wiki()
    """
    #db.url_folder.insert(url=1, folder= 1)
    response.flash = T("Welcome to web2py!")
    return dict(message=T('Hello World'))
def afterVal(form):
    print "after"
    print form.vars.id
    
def new():
    response.delimiters = ('<?','?>')
    url_form=SQLFORM(db.url).process()
    tag_form=SQLFORM(db.tag).process()
    urlTag_form=SQLFORM(db.url_tag).process()
    if url_form.accepted:
        #print 'record inserted'
        record = db.url(url_form.vars.id)
        url = record.URL
        #print url
        #convert the list to string then split it to list
        tagList = ''.join(record.Tags).split(',')
        for tag in tagList:
            tagRecord = db(db.tag.Tag==tag).select()[0]
            tagRecord.URLs.append(record)
            print "list start"
            print tagRecord.URLs
            print "end"
            tagRecord.update_record(URLs=tagRecord.URLs)
            #print newURLs
        #print url.Tags[0]
        response.flash = 'form accepted'
    else:
        response.flash =  'e'
        print urlTag_form.vars.id
    return locals()

def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())

@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


@auth.requires_signature()
def data():
    """
    http://..../[app]/default/data/tables
    http://..../[app]/default/data/create/[table]
    http://..../[app]/default/data/read/[table]/[id]
    http://..../[app]/default/data/update/[table]/[id]
    http://..../[app]/default/data/delete/[table]/[id]
    http://..../[app]/default/data/select/[table]
    http://..../[app]/default/data/search/[table]
    but URLs must be signed, i.e. linked with
      A('table',_href=URL('data/tables',user_signature=True))
    or with the signed load operator
      LOAD('default','data.load',args='tables',ajax=True,user_signature=True)
    """
    return dict(form=crud())
