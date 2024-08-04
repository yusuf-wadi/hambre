import { Button, Input } from '@mui/material';

import { initOpenAI } from '../pages/api/openai';
function fetchRecipe({ items }) {
    console.log(items);
    const n_and_q = items.map((item) => `${item.name} ${item.quantity}`).join(', ');
    console.log(n_and_q);
    const openai = initOpenAI();
    const model = 'gpt-3.5-turbo-1106';
    const messages = [{ role: 'user', content: `Fetch recipe for ${n_and_q}` }];
    const tools = [
      {
        type: 'function',
        function: {
          name: 'fetch_recipe',
          description: 'Fetch recipe from external API',
          parameters: {
            type: 'object',
            properties: {
              ingredients: { type: 'string', description: 'Ingredients for the recipe' },
            },
            required: ['ingredients'],
          },
        },
      },
    ];
  
    openai.chat.completions.create({
      model,
      messages,
      tools,
      tool_choice: 'auto',
    })
      .then((response) => {
        const assistantMessage = response.choices.message;
        console.log(assistantMessage);
        // Handle the response from the API
      })
      .catch((error) => {
        console.error(error);
      });
}
 

export const SuggestRecipe = ({items}) => {
    return (
        <div className='bg-gray-100'>
        <div className='container mx-auto p-5'>
            <h1 className='text-4xl font-bold text-center'>Suggest Recipe</h1>
            <div className='grid grid-cols-6 items-center text-black'>
            <Button
                className='text-white bg-amber-600 hover:bg-slate-900 p-3 text-xl'
                type='submit'
                onClick={() => fetchRecipe({ items })}
            >
                +
            </Button>
            </div>
        </div>
        </div>
    );
}