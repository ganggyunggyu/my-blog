import { useState } from 'react';

interface UseTagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const useTagManager = ({ tags, onTagsChange }: UseTagManagerProps) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onTagsChange([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return {
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    handleKeyPress,
  };
};
