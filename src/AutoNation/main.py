import asyncio
import gbulb
import sys
from dotenv import load_dotenv

from .app import AutoNation

load_dotenv()
gbulb.install(gtk=True)

def main():
    loop = asyncio.get_event_loop()
    loop.run_forever(application=AutoNation())

if __name__ == '__main__':
    sys.exit(main())
