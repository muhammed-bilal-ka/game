// Mock case generation service
// In a real implementation, this would call your backend API

export const generateNewCase = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const caseTemplates = [
    {
      title: "The Midnight Gallery Heist",
      victim: "Marcus Rothwell (Gallery Owner)",
      time: "2:30 AM, October 15th",
      location: "Rothwell Contemporary Art Gallery",
      description: "A priceless painting was stolen from a high-security gallery. The alarm system was disabled from the inside, and there are no signs of forced entry. The gallery owner was found unconscious in his office.",
      crimeSceneImage: "https://images.pexels.com/photos/8166295/pexels-photo-8166295.jpeg",
      suspects: [
        {
          id: "1",
          name: "Elena Vasquez",
          role: "Security Guard",
          bio: "Night shift security guard with access to all security systems. Recently divorced and facing financial difficulties.",
          alibi: "Claims she was doing her regular rounds when the theft occurred",
          mood: "Nervous",
          image: "https://images.pexels.com/photos/8166318/pexels-photo-8166318.jpeg",
          chatHistory: []
        },
        {
          id: "2",
          name: "Dr. James Morrison",
          role: "Art Appraiser",
          bio: "Renowned art expert who recently appraised the stolen painting. Has gambling debts and connections to underground art dealers.",
          alibi: "Says he was at home sleeping, but has no witnesses",
          mood: "Defensive",
          image: "https://images.pexels.com/photos/8166320/pexels-photo-8166320.jpeg",
          chatHistory: []
        },
        {
          id: "3",
          name: "Sarah Chen",
          role: "Gallery Assistant",
          bio: "Young art student who works part-time at the gallery. Has been acting strangely lately and was recently denied a promotion.",
          alibi: "Claims she left work early and went to a late-night café",
          mood: "Suspicious",
          image: "https://images.pexels.com/photos/8166322/pexels-photo-8166322.jpeg",
          chatHistory: []
        }
      ],
      evidence: [
        {
          id: "1",
          title: "Security Camera Footage",
          description: "Partial footage showing a figure in dark clothing near the painting",
          image: "https://images.pexels.com/photos/8166310/pexels-photo-8166310.jpeg",
          location: "Gallery Main Hall",
          significance: "Shows the theft in progress but face is obscured"
        },
        {
          id: "2",
          title: "Disabled Alarm Panel",
          description: "Security system was professionally disabled using an access code",
          image: "https://images.pexels.com/photos/8166312/pexels-photo-8166312.jpeg",
          location: "Security Office",
          significance: "Indicates inside knowledge of security protocols"
        },
        {
          id: "3",
          title: "Coffee Cup",
          description: "Fresh coffee cup found in the gallery office with lipstick traces",
          image: "https://images.pexels.com/photos/8166314/pexels-photo-8166314.jpeg",
          location: "Gallery Office",
          significance: "Suggests someone was in the office recently"
        }
      ],
      locations: [
        {
          id: "1",
          name: "Gallery Main Hall",
          description: "Where the painting was stolen from. High-security area with motion sensors.",
          evidence: ["1"],
          witnesses: []
        },
        {
          id: "2",
          name: "Security Office",
          description: "Contains all security controls and monitoring equipment.",
          evidence: ["2"],
          witnesses: []
        },
        {
          id: "3",
          name: "Gallery Office",
          description: "Private office where the gallery owner was found unconscious.",
          evidence: ["3"],
          witnesses: []
        }
      ],
      solution: {
        suspect: "Elena Vasquez",
        motive: "Financial Gain",
        method: "Inside Job"
      }
    },
    {
      title: "The Vanishing Violinist",
      victim: "Isabella Romano (Concert Violinist)",
      time: "9:45 PM, November 3rd",
      location: "Metropolitan Concert Hall",
      description: "A world-renowned violinist disappeared during intermission of her sold-out concert. Her priceless Stradivarius violin was left behind, but she vanished without a trace.",
      crimeSceneImage: "https://images.pexels.com/photos/8166299/pexels-photo-8166299.jpeg",
      suspects: [
        {
          id: "1",
          name: "Victor Petrov",
          role: "Concert Manager",
          bio: "Isabella's manager for the past 5 years. Recently discovered she was planning to switch to a rival agency.",
          alibi: "Claims he was handling VIP guests during intermission",
          mood: "Angry",
          image: "https://images.pexels.com/photos/8166318/pexels-photo-8166318.jpeg",
          chatHistory: []
        },
        {
          id: "2",
          name: "Dr. Amanda Foster",
          role: "Music Critic",
          bio: "Influential music critic who recently wrote a scathing review of Isabella's performance. Known for her volatile temper.",
          alibi: "Says she was in the lobby during intermission",
          mood: "Defensive",
          image: "https://images.pexels.com/photos/8166320/pexels-photo-8166320.jpeg",
          chatHistory: []
        },
        {
          id: "3",
          name: "Thomas Blackwood",
          role: "Stage Hand",
          bio: "Long-time employee of the concert hall. Has been acting strangely and was seen near Isabella's dressing room.",
          alibi: "Claims he was moving equipment backstage",
          mood: "Nervous",
          image: "https://images.pexels.com/photos/8166322/pexels-photo-8166322.jpeg",
          chatHistory: []
        }
      ],
      evidence: [
        {
          id: "1",
          title: "Abandoned Violin",
          description: "Isabella's priceless Stradivarius left in her dressing room",
          image: "https://images.pexels.com/photos/8166310/pexels-photo-8166310.jpeg",
          location: "Dressing Room",
          significance: "She would never leave this behind willingly"
        },
        {
          id: "2",
          title: "Torn Concert Program",
          description: "Ripped program found in the backstage area with threatening message",
          image: "https://images.pexels.com/photos/8166312/pexels-photo-8166312.jpeg",
          location: "Backstage Corridor",
          significance: "Contains handwritten threats against Isabella"
        },
        {
          id: "3",
          title: "Security Badge",
          description: "Staff security badge found in the parking garage",
          image: "https://images.pexels.com/photos/8166314/pexels-photo-8166314.jpeg",
          location: "Parking Garage",
          significance: "Belongs to a concert hall employee"
        }
      ],
      locations: [
        {
          id: "1",
          name: "Dressing Room",
          description: "Isabella's private dressing room where she was last seen.",
          evidence: ["1"],
          witnesses: []
        },
        {
          id: "2",
          name: "Backstage Corridor",
          description: "Narrow hallway connecting dressing rooms to the stage.",
          evidence: ["2"],
          witnesses: []
        },
        {
          id: "3",
          name: "Parking Garage",
          description: "Underground parking area with limited security coverage.",
          evidence: ["3"],
          witnesses: []
        }
      ],
      solution: {
        suspect: "Thomas Blackwood",
        motive: "Obsession",
        method: "Kidnapping"
      }
    }
  ];

  // Randomly select a case template
  const template = caseTemplates[Math.floor(Math.random() * caseTemplates.length)];
  
  // Generate unique case ID
  const caseId = `CASE-${Date.now().toString(36).toUpperCase()}`;
  
  return {
    ...template,
    id: caseId
  };
};