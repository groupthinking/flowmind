import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flow, prompt } = req.body;

  const systemPrompt = `
You are a helpful AI expert in automations. The user will give you a JSON flow (nodes, edges) and a prompt for how to change it. Return ONLY the new JSON flow.
`;

  const userPrompt = `
Flow JSON:
${JSON.stringify(flow, null, 2)}

User request: "${prompt}"

Output ONLY the new JSON (no explanation).
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.2,
    max_tokens: 3000,
  });

  // Try to extract JSON
  const content = completion.choices[0].message.content;
  let json = content;
  const match = content.match(/```json([^`]+)```/);
  if (match) json = match[1];
  try {
    const remixedFlow = JSON.parse(json);
    res.status(200).json({ remixedFlow });
  } catch (e) {
    res.status(400).json({ error: "Could not parse AI output", raw: content });
  }
}