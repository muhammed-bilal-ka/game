// Mock AI service for chat and deduction
// In a real implementation, this would call OpenAI GPT-4o API

export const chatWithAI = async (message: string, currentCase: any): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const responses = {
    suspects: [
      `Based on the evidence, we have ${currentCase.suspects.length} suspects. Each has a different motive and opportunity. Would you like me to analyze their alibis?`,
      `The suspects show varying levels of suspicious behavior. I recommend focusing on those with the strongest motives and weakest alibis.`,
      `Interesting question about the suspects. Let me analyze their psychological profiles and behavioral patterns for you.`
    ],
    evidence: [
      `We've collected ${currentCase.evidence.length} pieces of evidence. The most significant appears to be the security footage and physical traces left at the scene.`,
      `The evidence suggests this was a carefully planned operation. The perpetrator had inside knowledge of the security systems.`,
      `Cross-referencing the evidence with suspect profiles reveals some interesting connections. Would you like me to elaborate?`
    ],
    timeline: [
      `The timeline shows the incident occurred at ${currentCase.time}. This timing is crucial for verifying alibis.`,
      `Based on the sequence of events, the perpetrator had a narrow window of opportunity. This helps narrow down our suspect list.`,
      `The timeline reveals some inconsistencies in the witness statements that we should investigate further.`
    ],
    crime: [
      `The crime scene analysis reveals this was not a random act. The perpetrator knew the victim's routine and the location's security measures.`,
      `Forensic analysis suggests the perpetrator was familiar with the environment. This points to someone with regular access.`,
      `The method used indicates planning and premeditation. This wasn't a crime of passion.`
    ],
    default: [
      `That's an interesting observation. Based on the case details, I can help you analyze the connections between suspects and evidence.`,
      `Let me process that information against our case database. The patterns suggest we should focus on motive and opportunity.`,
      `Your question touches on a key aspect of the investigation. The evidence supports multiple theories at this point.`,
      `I understand your line of thinking. Let's examine how this relates to the physical evidence we've collected.`,
      `That's a valid investigative approach. Would you like me to help you correlate this with the suspect profiles?`
    ]
  };

  const lowerMessage = message.toLowerCase();
  let responseArray = responses.default;

  if (lowerMessage.includes('suspect') || lowerMessage.includes('who')) {
    responseArray = responses.suspects;
  } else if (lowerMessage.includes('evidence') || lowerMessage.includes('clue')) {
    responseArray = responses.evidence;
  } else if (lowerMessage.includes('timeline') || lowerMessage.includes('when') || lowerMessage.includes('time')) {
    responseArray = responses.timeline;
  } else if (lowerMessage.includes('crime') || lowerMessage.includes('scene') || lowerMessage.includes('how')) {
    responseArray = responses.crime;
  }

  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

export const chatWithSuspect = async (message: string, suspect: any, currentCase: any): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

  const suspectResponses = {
    alibi: [
      `I already told you where I was! ${suspect.alibi}. Why do you keep asking me the same questions?`,
      `Look, I've been completely honest about my whereabouts. ${suspect.alibi}. Check with anyone you want.`,
      `My alibi is solid. ${suspect.alibi}. I don't understand why I'm even a suspect here.`
    ],
    victim: [
      `${currentCase.victim} was... well, we had our differences, but I would never hurt anyone.`,
      `I knew ${currentCase.victim} professionally. We weren't close, but I respected their work.`,
      `My relationship with ${currentCase.victim} was complicated, but that doesn't make me a killer.`
    ],
    nervous: [
      `I... I don't know what you want me to say. I'm just nervous because I've never been questioned by police before.`,
      `This whole situation is terrifying. Of course I'm nervous! Wouldn't you be?`,
      `I keep thinking about what happened. It's horrible. That's why I seem on edge.`
    ],
    angry: [
      `I'm tired of these accusations! I've told you everything I know!`,
      `This is ridiculous! You're wasting time questioning me instead of finding the real culprit!`,
      `I don't appreciate being treated like a criminal when I'm innocent!`
    ],
    defensive: [
      `I don't have to answer that. I've been cooperative enough already.`,
      `You're trying to twist my words. I know my rights.`,
      `I think you're barking up the wrong tree here, detective.`
    ],
    default: [
      `I'm not sure what you're getting at. Can you be more specific?`,
      `I've told you everything I know about that night. What else do you want from me?`,
      `I understand you have a job to do, but I'm not your person.`,
      `Look, I want to help, but I don't know anything that would be useful to your investigation.`
    ]
  };

  const lowerMessage = message.toLowerCase();
  let responseArray = suspectResponses.default;

  if (lowerMessage.includes('alibi') || lowerMessage.includes('where were you')) {
    responseArray = suspectResponses.alibi;
  } else if (lowerMessage.includes('victim') || lowerMessage.includes(currentCase.victim.toLowerCase())) {
    responseArray = suspectResponses.victim;
  } else if (suspect.mood.toLowerCase() === 'nervous' && Math.random() > 0.5) {
    responseArray = suspectResponses.nervous;
  } else if (suspect.mood.toLowerCase() === 'angry' && Math.random() > 0.5) {
    responseArray = suspectResponses.angry;
  } else if (suspect.mood.toLowerCase() === 'defensive' && Math.random() > 0.5) {
    responseArray = suspectResponses.defensive;
  }

  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

export const submitDeduction = async (deduction: any, currentCase: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isCorrect = 
    deduction.suspect === currentCase.solution.suspect &&
    deduction.motive === currentCase.solution.motive &&
    deduction.method === currentCase.solution.method;

  const partiallyCorrect = 
    deduction.suspect === currentCase.solution.suspect ||
    deduction.motive === currentCase.solution.motive ||
    deduction.method === currentCase.solution.method;

  let score = 0;
  if (deduction.suspect === currentCase.solution.suspect) score += 40;
  if (deduction.motive === currentCase.solution.motive) score += 30;
  if (deduction.method === currentCase.solution.method) score += 30;

  return {
    correct: isCorrect,
    score: score,
    message: isCorrect 
      ? "Excellent detective work! You've solved the case with precision and skill."
      : partiallyCorrect
      ? "You're on the right track, but some details don't match the evidence. Keep investigating!"
      : "Your deduction doesn't align with the evidence. Review the case and try again.",
    difficulty: "Moderate",
    timeSpent: "45 minutes"
  };
};