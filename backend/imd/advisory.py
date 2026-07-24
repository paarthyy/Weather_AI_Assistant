def generate_advisory(weather, alerts, aqi):

    advice = []

    temp = weather["main"]["temp"]
    humidity = weather["main"]["humidity"]
    wind = weather["wind"]["speed"]

    if temp > 35:
        advice.append("🥵 High temperature. Stay hydrated.")

    if humidity > 80:
        advice.append("💧 High humidity. It may feel hotter.")

    if wind > 12:
        advice.append("💨 Strong winds. Secure loose objects.")

    if "rain" in weather["weather"][0]["description"].lower():
        advice.append("☔ Carry an umbrella.")

    if aqi >= 100:
        advice.append("😷 Wear a mask if outdoors.")

    if len(advice) == 0:
        advice.append("✅ Weather conditions look comfortable today.")

    return "\n".join(advice)