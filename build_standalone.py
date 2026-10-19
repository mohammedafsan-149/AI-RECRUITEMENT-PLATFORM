import re, subprocess, os, sys

def build():
    if os.path.exists('app_source.jsx'):
        with open('app_source.jsx', 'r', encoding='utf-8') as f:
            jsx_content = f.read()
    else:
        with open('index.html', 'r', encoding='utf-8') as f:
            html = f.read()
        match = re.search(r'<script type="text/babel">([\s\S]*?)</script>', html)
        if not match:
            print("Error: Could not find app_source.jsx or <script type='text/babel'> block")
            return False
        jsx_content = match.group(1)
        with open('app_source.jsx', 'w', encoding='utf-8') as f:
            f.write(jsx_content)

    print(f"JSX source size: {len(jsx_content)} characters")

    # Run esbuild to compile JSX to pure vanilla JS
    esbuild_cmd = [
        'cmd.exe', '/c',
        r'node_modules\.bin\esbuild.cmd',
        '..\\app_source.jsx',
        '--outfile=..\\app.bundle.js',
        '--target=es2020'
    ]
    
    res = subprocess.run(esbuild_cmd, cwd='frontend', capture_output=True, text=True)
    if res.returncode != 0:
        print("esbuild compilation failed:", res.stderr)
        return False

    print("Successfully compiled app.bundle.js via esbuild!")
    bundle_size = os.path.getsize('app.bundle.js')
    print(f"app.bundle.js size: {bundle_size} bytes")
    return True

if __name__ == '__main__':
    build()
