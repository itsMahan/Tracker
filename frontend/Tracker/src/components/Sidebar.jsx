import React from 'react';

const Sidebar = ({ setView }) => {
  return (
    <div
        className={`static flex flex-col h-full w-80 bg-base-200 text-base-content`}
    >
        <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-bold">Menu</h2>
        </div>
        <ul className="menu p-4">
            <li>
                <a onClick={() => { setView('tasks'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    Tasks
                </a>
            </li>
            <li>
                <a onClick={() => { setView('counters'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Counters
                </a>
            </li>
            <li>
                <a onClick={() => { setView('events'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Events
                </a>
            </li>
            <li>
                <a onClick={() => { setView('history'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13.5m0-13.5c-4.142 0-7.5 3.133-7.5 7s3.358 7 7.5 7-7.5-3.133-7.5-7 3.358-7 7.5-7z" /></svg>
                    History
                </a>
            </li>
        </ul>
    </div>
  );
};

export default Sidebar;
