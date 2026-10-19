import subprocess, time, json, urllib.request, asyncio
import urllib.parse

try:
    import websockets
except ImportError:
    subprocess.run(["pip", "install", "websockets"], check=True)
    import websockets

async def check_page():
    # 1. Fetch tab
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(req.read().decode())
    target = None
    for t in tabs:
        if 'index.html' in t.get('url', ''):
            target = t
            break
    
    if not target:
        print("index.html tab not found!")
        return

    ws_url = target['webSocketDebuggerUrl']
    print(f"Connecting to CDP: {ws_url}")
    
    async with websockets.connect(ws_url) as ws:
        # Enable Log, Runtime, Console
        await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Log.enable"}))
        await ws.send(json.dumps({"id": 3, "method": "Console.enable"}))
        
        # Evaluate document.getElementById('root').innerHTML
        eval_msg = {
            "id": 4,
            "method": "Runtime.evaluate",
            "params": {"expression": "document.getElementById('root').innerHTML.length"}
        }
        await ws.send(json.dumps(eval_msg))
        
        # Listen for 3 seconds
        end_time = time.time() + 3
        while time.time() < end_time:
            try:
                res = await asyncio.wait_for(ws.recv(), timeout=0.5)
                msg = json.loads(res)
                method = msg.get("method", "")
                if "exception" in method.lower() or "error" in method.lower() or "console" in method.lower():
                    print("CDP Event:", msg)
                elif msg.get("id") == 4:
                    print("Root innerHTML length:", msg.get("result", {}).get("result", {}).get("value"))
            except asyncio.TimeoutError:
                pass

if __name__ == '__main__':
    p = subprocess.Popen([
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        '--headless=new',
        '--remote-debugging-port=9222',
        'file:///C:/Users/MOHAMMED AFSAN/.gemini/antigravity/scratch/ai-recruitment-platform/index.html'
    ])
    time.sleep(2)
    try:
        asyncio.run(check_page())
    finally:
        p.kill()
