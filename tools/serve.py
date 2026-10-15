"""Local dev server for the STAT 220 app with caching disabled.
Usage (from the app/ folder):  python3 tools/serve.py   then open http://localhost:8220"""
import http.server, socketserver, sys, os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8220
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *args):
        pass

class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

print(f'Serving STAT 220 app at http://localhost:{PORT}  (Ctrl+C to stop)')
Server(('', PORT), NoCache).serve_forever()
