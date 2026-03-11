import dotenv from "dotenv"
dotenv.config()

export const generateTrip = async (req,res)=>{

  try{

    const {
      destination,
      startDate,
      endDate,
      travelStyle,
      interests
    } = req.body

    const start = new Date(startDate)
    const end = new Date(endDate)

    const tripDays = Math.max(
      1,
      Math.ceil((end - start) / (1000*60*60*24))
    )

    const pools = {

      adventure:[
        "Mountain hiking",
        "Waterfall trekking",
        "River kayaking",
        "Nature exploration",
        "Cliff viewpoint hike"
      ],

      culture:[
        "Historic landmark visit",
        "Museum exploration",
        "Temple visit",
        "Old town walking tour"
      ],

      food:[
        "Street food tour",
        "Local cooking class",
        "Food market exploration",
        "Traditional dinner"
      ],

      relaxation:[
        "City park walk",
        "Sunset viewpoint",
        "Riverfront stroll",
        "Spa experience"
      ]

    }

    let activityPool = []

    if(travelStyle?.includes("adventure")) activityPool.push(...pools.adventure)
    if(travelStyle?.includes("culture")) activityPool.push(...pools.culture)
    if(travelStyle?.includes("food")) activityPool.push(...pools.food)

    if(activityPool.length === 0){
      activityPool.push(...pools.relaxation)
    }

    if(interests?.includes("hiking")) activityPool.push("Guided hiking tour")
    if(interests?.includes("museum")) activityPool.push("Famous museum visit")
    if(interests?.includes("beach")) activityPool.push("Beach sunset walk")
    if(interests?.includes("shopping")) activityPool.push("Local market shopping")

    activityPool = [...new Set(activityPool)]

    // modifiers to spice up base activities and make them feel unique
    const modifiers = [
      "with a local expert",
      "during sunset",
      "for a relaxed pace",
      "with a picnic",
      "in the early morning",
      "after breakfast",
      "and capture photos",
      "followed by a tasting",
      "in a small group",
      "on a guided tour",
    ];

    const usedTitles = new Set();

    function generateActivity() {
      if (activityPool.length === 0) return null;
      const base = activityPool[Math.floor(Math.random() * activityPool.length)];
      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      const candidate = `${base} ${mod}`;
      if (usedTitles.has(candidate)) {
        // try again; recursion depth is limited by pool*mods
        return generateActivity();
      }
      usedTitles.add(candidate);
      return candidate;
    }

    // shuffle pool to keep order unpredictable
    activityPool.sort(() => Math.random() - 0.5);

    const days = [];

    for (let i = 1; i <= tripDays; i++) {
      const activities = [];

      for (let j = 0; j < 3; j++) {
        const title = generateActivity();
        if (!title) break;
        activities.push({
          time: j === 0 ? "09:00" : j === 1 ? "13:00" : "18:00",
          title,
          description: `Enjoy ${title.toLowerCase()} in ${destination}.`,
          location: destination,
          duration: "2 hours",
        });
      }

      days.push({
        day: i,
        title: `Day ${i} in ${destination}`,
        activities,
      });
    }

    res.json({ days });

  }catch(err){

    console.error(err)

    res.status(500).json({
      error:"Mock AI failed"
    })

  }

}