# 🌍 LocaLingo

LocaLingo is a web app that helps users **discover nearby places based on mood and intent**.  
Instead of generic search results, LocaLingo lets you find the right vibe — whether you want a quiet café to read or a lively rooftop bar with music.  
The app integrates **Foursquare Places API** for accurate data and uses **Mapbox** for map visualization.  

---

## 🚀 Project Overview
Most location-based apps show generic results that ignore a user’s **mood or purpose**. LocaLingo solves this by providing **context-aware suggestions**.  
Users can type or speak natural language queries like:  
> “Find a quiet café to read.”  
> “Lively rooftop bars nearby.”

LocaLingo applies mood and intent filters to Foursquare data, making discovery **faster and more intuitive**.  

---

## 👥 End Users
- Travelers and locals looking for a **personalized experience**.
- Foodies, remote workers, and social explorers who want **quick recommendations**.
- Anyone who values **crowd-level insights** and accurate place details.  

---

## 💡 Why It Matters
LocaLingo saves time by cutting through endless reviews and irrelevant results.  
It turns **searching for places into a guided, context-aware experience**.  

---

## 🔮 Future Improvements
If given more time and resources, we’d like to:  
- Build a **mobile app** (React Native) for on-the-go discovery.  
- Add **local language support** to reach more users.  
- Integrate **machine learning** for personalized results.  
- Partner with local businesses for **sponsored listings**.  
- Explore **AR/VR features** for virtual venue previews.  

---

## 🗺️ Tech Stack
| Area          | Tools Used                              |
|---------------|----------------------------------------|
| Frontend      | React, Tailwind CSS                    |
| Backend       | Node.js, Express                       |
| Database      | MongoDB                                |
| APIs          | Foursquare Places API, Mapbox          |
| Hosting/Other | TBD                                    |

---

## 🔎 Foursquare (FSQ) API Usage
- **Have you used FSQ before?**  
  First-time integration of FSQ in a production-style app.

- **Endpoints used & why:**  
  - `/places/search`: To fetch nearby places based on user queries.  
  - `/places/{fsq_id}`: To get **detailed data**, including categories, photos, and open hours.  

- **Most useful data:**  
  - **Categories** (for mood tagging)  
  - **Photos** (to enhance UX)  
  - **Open hours & popularity** (to recommend the best time to visit)

---

## 🌐 Links
- **GitHub Repo:** [Add link here]  
- **Live Demo:** [Add deployed URL here]  
- **YouTube Demo:** [Will be under 4 minutes – Add link here]  
- **Slides:** [Google Slides or PPT – Add link here]  

---

## 🛠️ How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/localingo.git
cd localingo
