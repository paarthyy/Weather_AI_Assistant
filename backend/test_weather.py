import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

print("API KEY:", API_KEY)

url = (
    f"https://api.openweathermap.org/data/2.5/weather"
    f"?q=Delhi&appid={API_KEY}&units=metric"
)

response = requests.get(url)

print(response.status_code)
print(response.json())