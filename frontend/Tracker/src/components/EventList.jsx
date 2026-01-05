import React from 'react';

const EventItem = ({ event, onEdit, onDelete, onDecrease, onIncrease, onReset }) => (
  <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-x-2 p-2 border-b border-base-300 hover:bg-base-200">
    <div className="col-start-1 row-start-1">
      <div className="font-bold">{event.title}</div>
    </div>
    <div className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 text-left sm:text-right text-sm opacity-70 mt-1 sm:mt-0">
      <span>Count: {event.used}</span>
    </div>
    <div className="col-start-2 sm:col-start-3 row-start-1 sm:row-span-2 ml-auto">
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a onClick={() => onEdit(event)}>Edit</a></li>
          <li><a onClick={() => onIncrease(event.id)}>Increase</a></li>
          <li><a onClick={() => onDecrease(event.id)}>Decrease</a></li>
          <li><a onClick={() => onReset(event.id)}>Reset</a></li>
          <li><a onClick={() => onDelete(event.id)}>Delete</a></li>
        </ul>
      </div>
    </div>
  </div>
);

const EventList = ({ events, onAddEvent, onEdit, onDelete, onDecrease, onIncrease, onReset, isLargeScreen }) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        {isLargeScreen && (
          <button className="btn btn-primary" onClick={onAddEvent}>Add Event</button>
        )}
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onReset={onReset}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
