import React, { useState } from 'react';

const DragAndDropExample = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [dragEnabled, setDragEnabled] = useState(true);

  const handleDragStart = (e, index) => {
    if (!dragEnabled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    if (!dragEnabled) return;
    const draggedIndex = parseInt(e.dataTransfer.getData('index'));
    const draggedItem = items[draggedIndex];
    const newItems = [...items];
    newItems[draggedIndex] = items[index];
    newItems[index] = draggedItem;
    setItems(newItems);
  };

  const toggleDrag = () => {
    setDragEnabled(!dragEnabled);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <div
            key={index}
            draggable={dragEnabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid black',
              margin: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: dragEnabled ? 'grab' : 'default',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button onClick={toggleDrag}>
        {dragEnabled ? 'Disable Drag' : 'Enable Drag'}
      </button>
    </div>
  );
};

export default DragAndDropExample;
