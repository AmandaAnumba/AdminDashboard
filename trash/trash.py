
# Parse database connection for RESTful API calls
# -------------------------------------------------
connection = http.client.HTTPSConnection('api.parse.com', 443)
PARSEappID = "ijqxeiardpj4GzolLOo2lhzegVopVBnn9bcHyIOs"
RESTapiKEY = "Rip5cgtxGNddTSe3yAoWdiIeJpMDALKJmUastpyf"


def migrate(request):
    connection.connect()
    connection.request('GET', '/1/classes/Articles', '', {
        "X-Parse-Application-Id": PARSEappID,
        "X-Parse-REST-API-Key": RESTapiKEY
    })
    
    result = json.loads(connection.getresponse().read().decode('utf-8'))

    if 'error' not in result.keys():
        for x in result['results']:
            try:
                publish = time.strptime(x['updatedAt'], "%Y-%m-%dT%H:%M:%S.%fZ")
                createdAt = time.strptime(x['createdAt'], '%Y-%m-%dT%H:%M:%S.%fZ')
                author = User.objects.get(username=x['author'])

                a = Article(
                    article_style = x['docstyle'],
                    article_type = x['doctype'],
                    author = author,
                    co_author = x['coAuthor'],
                    content = x['content'],
                    created_at = time.strftime('%Y-%m-%d %H:%M:%S', createdAt),
                    cycle = Cycle.objects.get(number = x['cycle']),
                    cycle_article = x['cycleArticle'],
                    description = x['description'],
                    feature_image = x['featureIMG'],
                    header_image = x['headerIMG'],
                    photo_credit = x['photoCred'],
                    published_date = time.strftime('%Y-%m-%d %H:%M:%S', publish),
                    search_terms = x['search'],
                    slug = x['slug'],
                    status = x['status'],
                    tags = x['tags'],
                    title = x['title']
                )

                a.save()

                for y in x['category']:
                    try:
                        a.category.add(Topic.objects.get(name=y))
                    except Exception as e:
                        print(e)
                        pass
                a.save()
            except Exception as e:
                print(e)
                pass



        print('done')
        return HttpResponse('<h1>Done</h1>')


