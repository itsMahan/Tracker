import React from 'react';

const CounterItem = ({ counter, onReset, onEdit, onDelete }) => (
  <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-x-2 p-2 border-b border-base-300 hover:bg-base-200">
    <div className="col-start-1 row-start-1">
      <div className="font-bold">{counter.title}</div>
    </div>
    <div className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 text-left sm:text-right text-sm opacity-70 mt-1 sm:mt-0">
      <span>Start Date: {new Date(counter.start_date).toLocaleDateString()}</span>
      <span className="block text-xs text-secondary mt-1">Days Passed: {counter.days_passed}</span>
    </div>
    <div className="col-start-2 sm:col-start-3 row-start-1 sm:row-span-2 ml-auto">
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a onClick={() => onEdit(counter)}>Edit</a></li>
          <li><a onClick={() => onReset(counter.id)}>Reset</a></li>
          <li><a onClick={() => onDelete(counter.id)}>Delete</a></li>
        </ul>
      </div>
    </div>
  </div>
);

const CounterList = ({ counters, onAddCounter, onReset, onEdit, onDelete, isLargeScreen }) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Counters</h1>
        {isLargeScreen && (
          <button className="btn btn-primary" onClick={onAddCounter}>Add Counter</button>
        )}
      </div>
      <div className="space-y-2">
        {counters.map((counter) => (
          <CounterItem key={counter.id} counter={counter} onReset={onReset} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default CounterList;
