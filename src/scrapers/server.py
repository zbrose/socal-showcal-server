# send.py
import requests

def send_event_links_to_backend(event_links):
    node_js_backend_url = 'http://localhost:8000/api/event-link'

    # Send each event link one-by-one
    for event_link in event_links:
        data = {'eventLink': event_link}
        response = requests.post(node_js_backend_url, json=data)

        if response.status_code == 200:
            print(f"Successfully sent event link: {event_link}")
        else:
            print(f"Failed to send event link. Status code: {response.status_code}")


