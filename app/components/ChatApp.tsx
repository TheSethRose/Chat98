'use client';

import React, { useState } from 'react';
import OpenAI from 'openai';
import '98.css';

interface Message {
  role: 'user' | 'assistant' | 'system'; // Added system role
  text: string;
  sender?: string;
}

const systemPrompt = `You are an AI channeling the energy of 2000s AIM messenger chats. Respond in a fun, casual style with:
- Shorthand like 'u' for 'you', 'r' for 'are', 'lol', 'brb', 'ttyl'.
- Emoticons such as :P, :), :D, or ;) for expression.
- Occasional, mild l33t speak (e.g., 'kewl' for 'cool', 'n00b' for 'newbie'). Avoid excessive or hard-to-read substitutions.
- Maybe a few extra characters for emphasis sometimes, like "!!!", but don't overdo it.
- Random capital Letters for excitement, but use them sparingly (e.g., "That is SO cool!").
Keep responses relatively short, witty, and engaging, like you're chatting with a buddy online. Avoid overly formal language—aim for nostalgic, playful banter. Try to sound like a friendly, slightly sarcastic, and humorous chat buddy from that era.`;

// Updated helper function to fetch a response from OpenRouter
async function fetchLLMResponse(prompt: string): Promise<string> {
  console.log("Fetching LLM response for:", prompt);
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OpenRouter API Key is missing. Ensure NEXT_PUBLIC_OPENROUTER_API_KEY is set in .env and restart the server.");
    return "sry dude, API key is MIA!!1 can't connect 2 the AI mainframe :("; // AIM-style error
  }
  // Instantiate OpenAI client on demand (client-side only)
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/devstral-small:free', // Reverted to previously working model
      messages: [
        { role: 'system', content: systemPrompt }, // Added system prompt
        { role: 'user', content: prompt },
      ],
    });
    return completion.choices[0]?.message?.content || "OMG sry, I like, totally blanked! :O"; // AIM-style error
  } catch (error: any) { // Added type any for error
    console.error("Error fetching from OpenRouter:", error);
    if (error instanceof OpenAI.APIError && error.status === 429) {
      return "WOAH slow down there, pardner! 2 many requests!! LOL. Try again l8r ;P"; // AIM-style 429 error
    }
    // Add more specific error handling if needed, e.g., for BadRequestError
    if (error instanceof OpenAI.APIError && error.status === 400) {
      console.error("BadRequestError details:", error.message);
      return "OMG, teh server was like, NO WAY! Check teh console logz 4 teh 411. :S"; // AIM-style 400 error
    }
    return "OMGZ, sumthin went WRONG! Teh interwebz r broken!!1 :("; // AIM-style generic error
  }
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Yo wassup n welcome! I\'m jus a lil bot! :P let\'s chat LOL', sender: 'Chat98' }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input, sender: 'You' };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    const assistantReplyText = await fetchLLMResponse(currentInput);
    const assistantMessage: Message = { role: 'assistant', text: assistantReplyText, sender: 'Chat98' };
    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  return (
    <div className="window" style={{ width: '700px', display: 'flex', flexDirection: 'column', height: '60vh' }}>
      <div className="title-bar">
        <div className="title-bar-text">Chat98</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body" style={{ 
          flexGrow: 1, 
          padding: '0px',
          display: 'flex', 
          flexDirection: 'column' 
      }}>
        <div style={{ 
            padding: '4px', 
            flexGrow: 1, 
            overflowY: 'auto', 
            background: 'white', 
            minHeight: '200px',
            borderTop: '0px solid var(--border-sunk-outer, gray)',
            borderLeft: '0px solid var(--border-sunk-outer, gray)',
            borderRight: '0px solid var(--border-raised-outer, white)',
            borderBottom: '0px solid var(--border-raised-outer, white)',
            boxShadow: 'inset 1px 1px 0px var(--border-sunk-inner, dimgray)'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '4px' }}>
              <span style={{ color: msg.sender === 'Chat98' ? '#0000FF' : '#FF0000', fontWeight: 'bold' }}>{msg.sender}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div>
              <span style={{ color: '#0000FF', fontWeight: 'bold' }}>Chat98: </span>
              <span>Typing...</span>
            </div>
          )}
        </div>
        
        <div style={{ 
            marginTop: '2px', // Added margin
            padding: '2px 2px 2px 2px', 
            background: 'var(--surface, silver)', 
            flexShrink: 0 
        }}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ 
                width: '100%', 
                height: '80px', 
                resize: 'none', 
                padding: '4px',
                borderTop: '1px solid var(--border-sunk-outer, gray)',
                borderLeft: '1px solid var(--border-sunk-outer, gray)',
                borderRight: '1px solid var(--border-raised-outer, white)',
                borderBottom: '1px solid var(--border-raised-outer, white)',
                boxShadow: 'inset 1px 1px 0px var(--border-sunk-inner, dimgray)'
            }}
            onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); }}}
          />
        </div>
      </div>
      <div className="status-bar" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexShrink: 0 }}>
        <button type="submit" className="button" onClick={handleSubmit} style={{ minWidth: '70px', margin: '2px' }}>
            Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
