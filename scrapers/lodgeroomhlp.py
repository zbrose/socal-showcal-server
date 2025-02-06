import requests
from bs4 import BeautifulSoup


# get event link
import requests
from bs4 import BeautifulSoup

def scrape_event_links():
    url = 'https://www.lodgeroomhlp.com/'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        event_cards = soup.find_all('div', class_='tessera-show-card')

        event_links = []
        for event in event_cards:
            event_div = event.find_all('div', class_='tessera-has-inventory')
            for link in event_div:
                event_link = link.find('a')['href']  # Get the link
                event_links.append(event_link)

        return event_links
    else:
        print(f"Failed to fetch page. Status code: {response.status_code}")
        return []
