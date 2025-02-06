# main.py
from lodgeroomhlp import scrape_event_links
from server import send_event_links_to_backend

def main():
    # Step 1: Scrape event links
    event_links = scrape_event_links()
    
    if event_links:
        # Step 2: Send event links to the backend
        send_event_links_to_backend(event_links)
    else:
        print("No event links to send!")

if __name__ == '__main__':
    main()