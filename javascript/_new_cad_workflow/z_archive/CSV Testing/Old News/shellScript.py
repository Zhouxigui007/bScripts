#Used to make requests
import urllib.request

def getContent():
	x = urllib.request.urlopen('https://www.google.com/')
	html = x.read()
	return html

getContent()