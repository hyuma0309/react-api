import os, sys, urlparse, SimpleHTTPServer, BaseHTTPServer
HOST='0.0.0.0'
PORT=3000
class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        request_file_path = urlparse.urlparse(self.path).path.strip('/')
        if not os.path.exists(request_file_path):
            self.path = 'index.html'
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
httpd = BaseHTTPServer.HTTPServer((HOST, PORT), Handler)
print 'Serving HTTP on %s port %d ...' % (HOST, PORT)
httpd.serve_forever()