import React, { useState, useEffect } from 'react';

const EditEventModal = ({ event, onUpdateEvent, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [used, setUsed] = useState(event.used);
  const [total, setTotal] = useState(event.total || ''); // Initialize with empty string if null

  useEffect(() => {
    setTitle(event.title);
    setUsed(event.used);
    setTotal(event.total || '');
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEvent({ ...event, title, used: parseInt(used, 10), total: total === '' ? null : parseInt(total, 10) });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Event</h3>
        <form onSubmit={handleSubmit} className="py-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Used Count</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={used}
              onChange={(e) => setUsed(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Total (Optional)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
