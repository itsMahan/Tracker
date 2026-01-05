import React, { useState } from 'react';

const AddEventModal = ({ onAddEvent, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ title, description, count });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Count</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
