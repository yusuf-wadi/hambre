'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';
import { FormItem } from '../components/FormItem';
import { Button, Input } from '@mui/material';  
import { SuggestRecipe } from '../components/SuggestRecipe';

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'apple', quantity: 1.5 },
  ]);
  const [needed_items, setNeededItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== '') {
      //setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({ name: '', quantity: '' });
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalQuantity = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.quantity),
          0
        );
        setTotal(totalQuantity);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      {/* left column */}
      
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
        <h1 className='text-4xl p-4 text-center'>What you have</h1>
        <div className='bg-amber-300 p-4 rounded-lg'>
        <FormItem newItem={newItem} setNewItem={setNewItem} addItem={addItem} />
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-amber-700'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-amber-900 hover:bg-amber-900 w-16'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ''
          ) : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
      {/* middle */}
      <div className='z-20 w-fit max-w-5xl items-center justify-between font-mono text-sm '>
        <div className='bg-amber-300 p-4 rounded-lg'>
          <SuggestRecipe items={items} />
        </div>
      </div>
      {/* right column */}
      <div className='z-0 w-full max-w-5xl items-right justify-between font-mono text-sm '>
        <h1 className='text-4xl p-4 text-center'>What you need</h1>
        <div className='bg-amber-300 p-4 rounded-lg'>
          <ul>
            {needed_items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-amber-700'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-amber-900 hover:bg-amber-900 w-16'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {needed_items.length < 1 ? (
            ''
          ) : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
      
    </main>
  );
}
