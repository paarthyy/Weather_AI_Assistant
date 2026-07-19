import requests


def get_location():
    """
    Get the user's approximate location using IP.
    """

    url = "http://ip-api.com/json/"

    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Unable to fetch location.")

    data = response.json()

    if data["status"] != "success":
        raise Exception(data["message"])

    return {
        "city": data["city"],
        "state": data["regionName"],
        "country": data["country"],
        "latitude": data["lat"],
        "longitude": data["lon"],
        "isp": data["isp"],
        "timezone": data["timezone"]
    }