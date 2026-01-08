import React, { useState } from 'react';

const AddEventModal = ({ onAddEvent, onClose }) => {
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState(''); // Corresponds to total in backend, optional
  const [used, setUsed] = useState(0); // Corresponds to used in backend

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      title,
      total: total === '' ? null : parseInt(total, 10),
      used: parseInt(used, 10)
    });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Event</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Event Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Initial Count (Used)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={used}
              onChange={(e) => setUsed(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total (Optional)</span>
            </label>
            <input
              type="number"
              placeholder="Total count (optional)"
              className="input input-bordered w-full"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
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
