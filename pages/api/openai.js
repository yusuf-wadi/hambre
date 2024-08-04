import OpenAI from 'openai';
export const initOpenAI = () => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,  dangerouslyAllowBrowser: true});
    return openai;
};