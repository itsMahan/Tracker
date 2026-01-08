import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EditCounterModal = ({ counter, onUpdateCounter, onClose }) => {
  const [title, setTitle] = useState(counter.title);
  const [startDate, setStartDate] = useState(format(new Date(counter.start_date), 'yyyy-MM-dd'));

  useEffect(() => {
    setTitle(counter.title);
    setStartDate(format(new Date(counter.start_date), 'yyyy-MM-dd'));
  }, [counter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateCounter({ ...counter, title, start_date: startDate });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Counter</h3>
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
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Counter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCounterModal;
