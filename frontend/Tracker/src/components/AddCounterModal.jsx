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
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
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
