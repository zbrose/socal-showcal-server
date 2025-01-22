import requests
from bs4 import BeautifulSoup

def scrape_concerts():
    url = "https://gold-diggers.com/pages/drink#events"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    concerts = []
    for event in soup.select(".concert-event"):
        concerts.append({
            "artist": event.select_one(".artist-name").text,
            "date": event.select_one(".date").text,
            "time": event.select_one(".time").text,
            "location": event.select_one(".location").text,
            "price": event.select_one(".ticket-price").text,
        })
    return concerts
