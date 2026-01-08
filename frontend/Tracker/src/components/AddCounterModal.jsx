import React, { useState } from 'react';

const AddCounterModal = ({ onAddCounter, onClose }) => {
  const [title, setTitle] = useState('');
  const [start_date, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCounter({ title, start_date });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Counter</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Counter Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Counter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCounterModal;
