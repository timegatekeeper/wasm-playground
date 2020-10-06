#!/usr/bin/env python
# HTTP servers have to be adapted to support the wasm mime type
# As most developers have MacOS, which has python installed, python server is least faff.
import BaseHTTPServer, SimpleHTTPServer
SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.wasm'] = 'application/wasm'
port = 8000
httpd = BaseHTTPServer.HTTPServer(('localhost', 8000),
    SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.serve_forever()