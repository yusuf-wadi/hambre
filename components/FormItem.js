import { Button, Input } from '@mui/material';

export const FormItem = ({ newItem, setNewItem, addItem }) => {
    return (
      <form className='grid grid-cols-6 items-center text-black'>
        <Input
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className='col-span-3 p-3 border'
          type='text'
          placeholder='Enter Item'
        />
        <Input
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: e.target.value })
          }
          className='col-span-2 p-3 border mx-3'
          type='number'
          placeholder='Enter '
        />
        <Button
          onClick={addItem}
          className='text-white bg-amber-600 hover:bg-amber-900 p-3 text-xl'
          type='submit'
        >
          +
        </Button>
      </form>
    );
  };