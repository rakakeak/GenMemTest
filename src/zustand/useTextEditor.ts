import {useState} from 'react';
import {TextItem} from '../../App';
import {useTextStore} from '../zustand/useTextStore';
import colors from '../themes/colors';

export const useTextEditor = () => {
  const [texts, setTexts] = useState<TextItem[]>([]);
  const selectedId = useTextStore(state => state.selectedId);
  const setSelectedId = useTextStore(state => state.setSelectedId);

  const selectedText = texts.find(t => t.id === selectedId);

  // Update the text string when editing
  const handleUpdateText = (id: string, newText: string) => {
    setTexts(current =>
      current.map(t => (t.id === id ? {...t, text: newText} : t)),
    );
  };

  // Update scale & rotation
  const handleUpdateTransform = (
    id: string,
    scale: number,
    rotation: number,
  ) => {
    setTexts(current =>
      current.map(t => (t.id === id ? {...t, scale, rotation} : t)),
    );
  };

  const handleDeleteText = (id: string) => {
    setTexts(current => current.filter(t => t.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleCopy = (id: string) => {
    const original = texts.find(t => t.id === id);
    if (!original) return;
    const newId = `${Date.now()}_copy`;
    setTexts(current => [
      ...current,
      {...original, id: newId, scale: 1, rotation: 0},
    ]);
    setSelectedId(newId);
  };

  const addNewText = () => {
    const newId = Date.now().toString();
    setTexts(prev => [
      ...prev,
      {
        id: newId,
        text: 'Edit Text',
        fontSize: 24,
        color: colors.primary,
        fontFamily: 'Roboto',
        scale: 1,
        rotation: 0,
        opacity: 1,
      },
    ]);
    setSelectedId(newId);
  };

  const updateSelected = (key: keyof TextItem, value: number) => {
    if (!selectedId) return;
    setTexts(prev =>
      prev.map(t => (t.id === selectedId ? {...t, [key]: value} : t)),
    );
  };

  return {
    texts,
    setTexts,
    selectedId,
    setSelectedId,
    selectedText,
    addNewText,
    handleUpdateText,
    handleUpdateTransform,
    handleDeleteText,
    handleCopy,
    updateSelected,
  };
};
