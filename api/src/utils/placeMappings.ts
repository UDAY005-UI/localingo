export const moodMap: Record<string, string> = {
    "Coffee Shop": "Cozy",
    "Internet Cafe": "Focused",
    "Gaming Cafe": "Lively",
    "Restaurant": "Casual",
    // Add more categories as needed
  };
  
  export const intentMap: Record<string, string> = {
    "Coffee Shop": "Hangout / Study",
    "Internet Cafe": "Work / Study",
    "Gaming Cafe": "Play / Hangout",
    "Restaurant": "Eat / Meet",
    // Add more categories as needed
  };
  
  export function getMood(categoryName: string | undefined): string {
    if (!categoryName) return "Not Available";
    return moodMap[categoryName] || "Not Available";
  }
  
  export function getIntent(categoryName: string | undefined): string {
    if (!categoryName) return "Not Available";
    return intentMap[categoryName] || "Not Available";
  }
  